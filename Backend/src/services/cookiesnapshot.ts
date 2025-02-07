
import {
  CookieSnapshot,
  insertCookieSnapshot,
} from "../database/insertCookieSnapshot";
import axios from "axios";

 export const cookieSnapShotHandler = async (client:any,tokenAddress:string) => {
 try {
    // Extract query parameters

    // If no agent_name is provided, fetch from Cookie API
      try {
        const response = await axios.get(
          `https://api.cookie.fun/v2/agents/contractAddress/${tokenAddress}`,
          {
            params: { interval: "_3Days" },
            headers: { "x-api-key": process.env.COOKIE_API_KEY },
          }
        );

        // Process the response and insert into database
        console.log(response.data);
        const snapshot: CookieSnapshot = {
          token_address: tokenAddress,
          agent_name: response.data.ok.agentName,
          contracts: response.data.ok.contracts,
          twitter_usernames: response.data.ok.twitterUsernames,
          mindshare: response.data.ok.mindshare,
          mindshare_delta_percent: response.data.ok.mindshareDeltaPercent,
          market_cap: response.data.ok.marketCap,
          market_cap_delta_percent: response.data.ok.marketCapDeltaPercent,
          price: response.data.ok.price,
          price_delta_percent: response.data.ok.priceDeltaPercent,
          liquidity: response.data.ok.liquidity,
          volume_24h: response.data.ok.volume24Hours,
          volume_24h_delta_percent: response.data.ok.volume24HoursDeltaPercent,
          holders_count: response.data.ok.holdersCount,
          holders_count_delta_percent:
            response.data.ok.holdersCountDeltaPercent,
          avg_impressions_count: response.data.ok.averageImpressionsCount,
          avg_impressions_delta_percent:
            response.data.ok.averageImpressionsCountDeltaPercent,
          avg_engagements_count: response.data.ok.averageEngagementsCount,
          avg_engagements_delta_percent:
            response.data.ok.averageEngagementsCountDeltaPercent,
          followers_count: response.data.ok.followersCount,
          smart_followers_count: response.data.ok.smartFollowersCount,
          top_tweets: response.data.ok.topTweets,
        };
     

        await insertCookieSnapshot(client, snapshot);
        return{
          Success:true
        }
      } catch (error) {
        console.error("Error fetching data from Cookie API:", error);
      }
    
  } catch (error) {
    console.error("Error fetching cookie snapshots:", error);
return {
  success: false,
  error: "Internal server error"
}
  }
}