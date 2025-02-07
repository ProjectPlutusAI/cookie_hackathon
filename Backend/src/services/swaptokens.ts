import { PublicKey } from "@solana/web3.js";
import { SolanaAgentKit } from "solana-agent-kit";
const splToken = require("@solana/spl-token");
import dotenv from 'dotenv';

dotenv.config();



const config = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

export async function swapTokens(
userPrivateKey:string,
  targetTokenMint: string,
  amount: number,
  sourceTokenMint: string,
  slippage: number,
  isBuy: boolean
): Promise<string> {
  try {
    const agent = new SolanaAgentKit(
        userPrivateKey,
        process.env.NEXT_PUBLIC_RPC,
        config
      );
      console.log(agent)
    // Check user balance
//     const userAccount = await splToken.getAccount(agent.connection, agent.wallet.publicKey);
//     const balance = Number(userAccount.amount);


//    if (isBuy) {
//       // For buy, input is SOL
//       if (balance < amount) {
//         throw new Error("Insufficient SOL balance");
//       }
//       sourceTokenMint = "So11111111111111111111111111111111111111112"; // Native SOL mint address
//     } else {
//       // For sell, check if user has enough of the source token
//       const sourceTokenAccount = await splToken.getAccount(agent.connection, new PublicKey(sourceTokenMint));
//       if (Number(sourceTokenAccount.amount) < amount) {
//         throw new Error("Insufficient token balance");
//       }
//     }

    const signature = await agent.trade(
      new PublicKey(targetTokenMint),
      amount,
      new PublicKey(sourceTokenMint),
      slippage
    );

    return signature;
  } catch (error) {
    console.error("Error in swapTokens:", error);
    throw error;
  }
}

export async function openMeteoraPool(userPrivateKey:string, tokenAddress:string) {
  try {
    const agent = new SolanaAgentKit(
      userPrivateKey,
      process.env.NEXT_PUBLIC_RPC,
      config
    );  
    // Get the price from Jupiter
    const jupiterResponse = await fetch(`https://price.jup.ag/v4/price?ids=${tokenAddress}`);
    const jupiterData = await jupiterResponse.json();
    const price = jupiterData.data[tokenAddress].price;

    // Use the price from Jupiter as the initial price
    const initialPrice = price;

    const signature = await agent.meteoraCreateDlmmPool(
      new PublicKey(tokenAddress), // tokenAMint
      new PublicKey("So11111111111111111111111111111111111111112"), // tokenBMint (SOL)
      10, // binStep
      initialPrice, // initialPrice
      true, // priceRoundingUp
      30, // feeBps (0.3%)
      0, // activationType
      false, // hasAlphaVault,
      undefined
    );

    return signature;
  } catch (error) {
    console.error("Error in openMeteoraPool:", error);
    throw error;
  }
}

