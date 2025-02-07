import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  CookieSnapshot,
  insertCookieSnapshot,
} from "./database/insertCookieSnapshot";
import axios from "axios";
import routes from "./routes";
import { Client } from "pg";
import {
  getCookieSnapshots,
  getCookieTweets,
} from "./database/getCookieSnapshots";
import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";
import cron from "node-cron";

import { cookieSnapShotHandler } from "./services/cookiesnapshot";
import { swapTokens,openMeteoraPool } from "./services/swaptokens";
// import { swapTokens } from "./services/swaptokens";

// Fetch and store tokens when the server starts
console.log("START SERVER")
dotenv.config();
const PORT = process.env.PORT || 3005;

// -- Create a PostgreSQL client (direct DB connection).
const client = new Client({
  connectionString: process.env.BACKUP_URL,
});

// Connect at startup.
client.connect().catch((error) => {
  console.error("Failed to connect to DB:", error);

});

// Log all environment variables (be cautious with this in production)
// fetchAndStoreTokens()
// .then(() => console.log('Tokens fetched and stored successfully'))

const app = express();

app.use(
  cors({
    origin: "*", // Allow any origin
  })
);

app.use(express.json());

// Test function to fetch token from cache
/*const testTokenFetch = async () => {
  try {
    const token = await fetchTokensFromRedis('PPCOIN');
    console.log('Fetched token:', token);
  } catch (error) {
    console.error('Error fetching token:', error);
  }
};

// Call the test function
testTokenFetch();*/


// Function to execute DCA orders
async function cookieSnapShotCronHandler(client: Client) {
  try {
    // Fetch active DCA orders
    const query = `
      SELECT id, token_address, amount
      FROM dca_orders
      WHERE status = 'active'
    `;
    const result = await client.query(query);

    // Process each active DCA order
    for (const order of result.rows) {
      try {
        await cookieSnapShotHandler(client, order.token_address);
        console.log(
          `Processed DCA order ${order.id} for token ${order.token_address}`
        );
        // Here you would typically execute the actual DCA purchase
        // and update the order status if needed
      } catch (error) {
        console.error(`Error processing DCA order ${order.id}:`, error);
      }
    }
  } catch (error) {
    console.error("Error executing DCA orders:", error);
  }
}

// Schedule the cron job to run every 30 minutes
cron.schedule("*/30 * * * *", async () => {
  console.log("Running DCA order execution");
  await cookieSnapShotCronHandler(client);
});
// executeDCAOrders(client);

// Function to execute DCA orders
async function executeDCAOrders(client: Client) {
  try {
    // Fetch active DCA orders that need execution
    const query = `
      SELECT id, user_id, token_address, amount, frequency
      FROM dca_orders
      WHERE status = 'active'
      AND (last_execution_date IS NULL OR last_execution_date < NOW() - INTERVAL '30 minutes')
    `;
    const result = await client.query(query);
    // Process each DCA order that needs execution
    for (const order of result.rows) {
      try {
        const snapshots = await getCookieSnapshots(client, {
          token_address: order.token_address,
        });
        if (snapshots.data.length > 0) {
          let tx_hash= null
          const analysis = await analyzeWithDeepSeek(snapshots.data);
          const userQuery = `
          SELECT encrypted_private_key
          FROM users
          WHERE id = $1
        `;
        const userResult = await client.query(userQuery, [order.user_id]);
        const encryptedPrivateKey = userResult.rows[0].encrypted_private_key;
          
        // Decrypt the private key
        const decryptedPrivateKey = encryptedPrivateKey;
          if(analysis.recommendation === "BUY"){
          // Fetch user's encrypted private key
         
          if (userResult.rows.length > 0) {
           
            
            if (decryptedPrivateKey) {
              // Perform the swap using the decrypted private key
              // This is where you'd integrate with your swap function
              tx_hash = await swapTokens(
                decryptedPrivateKey,
                order.token_address,
                0.05,
                "So11111111111111111111111111111111111111112",
                0.5,
                true
              );
            } else {
              console.error(`Failed to decrypt private key for user ${order.user_id}`);
            }
          } else {
            console.error(`No user found with id ${order.user_id}`);
          }
          }else if(analysis.recommendation === "HEDGE"){
            if (decryptedPrivateKey) {
              // Perform the swap using the decrypted private key
              // This is where you'd integrate with your swap function
              tx_hash = await openMeteoraPool(
                decryptedPrivateKey,
                order.token_address,
              );
            } else {
              console.error(`Failed to decrypt private key for user ${order.user_id}`);
            }
          }
          // Create a notification based on the analysis
          const notificationQuery = `
            INSERT INTO actions(user_id, action, analysis, order_id, tx_hash)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
          `;

          const notificationValues = [
            order.user_id,
            analysis.recommendation,
            analysis.analysis,
            order.id,
            tx_hash
          ];

          const notificationResult = await client.query(notificationQuery, notificationValues);

          console.log(`Created notification ${notificationResult.rows[0].id} for user ${order.user_id}`);

          // Update the order's last execution date
          await client.query(
            `
          UPDATE dca_orders
          SET last_execution_date = NOW()
          WHERE id = $1
        `,
            [order.id]
          );
        }

        // console.log(`Executed DCA order ${order.id} for token ${order.token_address}. Signature: ${signature}`);

        // // Optionally, trigger a cookie snapshot after the swap
        // await cookieSnapShotHandler(client, order.token_address);
      } catch (error) {
        console.error(`Error processing DCA order ${order.id}:`, error);
      }
    }
  } catch (error) {
    console.error("Error executing DCA orders:", error);
  }
}

// Schedule the cron job to run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("Running DCA order execution");
  await executeDCAOrders(client);
});

// Helper function to get user's private key (implement securely)


app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

async function analyzeWithDeepSeek(
  snapshots: CookieSnapshot[]
): Promise<any> {
  try {
  const formattedData = snapshots.map((snapshot) => ({
    timestamp: snapshot.timestamp,
    mindshare: snapshot.mindshare,
    // mindshare_percentage: snapshot.mindshare_percentage,
    market_cap: snapshot.market_cap,
    volume_24h: snapshot.volume_24h,
    holders_count: snapshot.holders_count,
    avg_impressions_count: snapshot.avg_impressions_count,
    followers_count: snapshot.followers_count,
    avg_engagements_count: snapshot.avg_engagements_count,
    price: snapshot.price,
  })).slice(0,5)
console.log('processing data')
  const prompt = `
  You are a cryptocurrency market analyst. Analyze the following time series data for a token:

  ${JSON.stringify(formattedData, null, 2)}

  Based on these data points, determine if it's a good time to buy this token. Consider the following:
  1. Trends in mindshare and social metrics (impressions, followers, engagements)
  2. Market cap and volume trends
  3. Price movement
  4. Holder count changes

  Focus on identifying positive trends that may indicate future price performance. Look for any signs of growth or potential, even if they are small. Consider the possibility of getting in early on a promising token.

  Recommend buying if there are any notable positive indicators or potential for growth. Only suggest waiting if there are clear negative trends across multiple metrics.

  Provide your analysis and recommendation in the following JSON format:
  {
    "recommendation": "BUY" or "WAIT" or "HEDGE",
    "analysis": "Your concise analysis in 3-5 sentences, highlighting positive aspects and potential for growth."
  }
`;

  
    const response = await axios.post(
      "https://api.deepseek.com/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a cryptocurrency market analyst.",
          },
          { role: "user", content: prompt },
        ],
        stream: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API}`,
        },
      }
    );
    console.log(response.data.choices[0].message.content);
    const aiResponse = response.data.choices[0].message.content;
        const cleanedResponse = aiResponse.replace(/```json\n|\n```/g, '').trim();

    const jsonResponse = JSON.parse(cleanedResponse);
    console.log(jsonResponse);

    return ({recommendation:jsonResponse.recommendation,analysis:jsonResponse.analysis});
  } catch (error) {
    console.log(error);
    return {
      recommendation: "WAIT",
      analysis: "Unable to perform analysis due to an error. It's recommended to wait until a proper analysis can be conducted."
    };
  }
}
