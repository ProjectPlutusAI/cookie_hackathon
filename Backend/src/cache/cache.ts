import axios from "axios";
import { createClient } from "redis";
import dotenv from "dotenv";
import { updateAvailableSymbolsMap } from "./storedCache";
interface TokenData {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI: string;
    verified?: boolean;
    dailyVolume: number | null;
  }
dotenv.config();
const redisClient = createClient({
    username: process.env.REDIS_USERNAME || "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || "6379"),
    },
});


// Initialize Redis connection
const initRedis = async () => {
  await redisClient.connect();
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
};


// Function to get all tokens from Redis cache
export const getAllTokensFromCache = async (): Promise<TokenData[]> => {
  try {
    // Get all entries from the symbolCache hash
    const allTokens = await redisClient.hGetAll('symbolCache');

    // Parse and transform the data
    const tokenArray: TokenData[] = Object.values(allTokens).map(tokenString => {
      const token = JSON.parse(tokenString);
      return {
        address: token.address,
        symbol: token.symbol,
        name: token.name,
        decimals: parseInt(token.decimals),
        logoURI: token.logoURI,
        verified: token.verified === 'true',
        dailyVolume: token.dailyVolume ? parseFloat(token.dailyVolume) : 0
      };
    });

    return tokenArray;
  } catch (error) {
    console.error('Error fetching all tokens from cache:', error);
    throw error;
  }
};

const fetchAndStoreTokens = async () => {
  try {
    // Fetch both lists in parallel
    const [allTokensResponse, strictTokensResponse] = await Promise.all([
      axios.get("https://api.jup.ag/tokens"),
      axios.get("https://api.jup.ag/tokens/v1/tagged/verified"),
    ]);

    const allTokens: any[] = allTokensResponse.data;
    const strictTokens: any[] = strictTokensResponse.data;

    // Create a set of verified token addresses for quick lookup
    const verifiedAddresses = new Set(
      strictTokens.map((token) => token.address)
    );

    // Store all tokens in Redis with verified status
    for (const token of allTokens) {
      const key = `${token.address}:${token.symbol.toLowerCase()}`;
      // Check if token already exists in symbolCache
      console.log(`Token ${key} storing`);

      const existingToken = await redisClient.hGet("symbolCache", key);
      if (existingToken) {
        console.log(`Token ${key} already exists in cache. Skipping.`);
        continue;
      }
      // Check if token exists in manualSymbolCache
      const existingManualToken = await redisClient.hGet("manualSymbolCache", key);
      if (existingManualToken) {
        console.log(`Token ${key} exists in manual cache. Deleting from manual cache.`);
        await redisClient.hDel("manualSymbolCache", key);
      }

      // Store in symbolCache
      await redisClient.hSet(
        "symbolCache",
        key,
        JSON.stringify({
          address: token.address,
          symbol: token.symbol,
          name: token.name,
          decimals: token.decimals.toString(),
          logoURI: token.logoURI,
          verified: verifiedAddresses.has(token.address).toString(),
          dailyVolume: token.daily_volume,
        })
      );
    }

    // Get all tokens from manualSymbolCache
    const manualTokens = await redisClient.hGetAll("manualSymbolCache");

    // Store manual tokens in symbolCache
    for (const [key, value] of Object.entries(manualTokens)) {
      const token = JSON.parse(value);
      
      // Store or update in symbolCache
      await redisClient.hSet("symbolCache", key, JSON.stringify({
        address: token.address,
        symbol: token.symbol,
        name: token.name,
        decimals: token.decimals,
        logoURI: token.logoURI,
        verified: token.verified,
        dailyVolume: token.dailyVolume,
      }));

      console.log(`Token ${key} stored/updated in symbolCache from manualSymbolCache.`);
    }

    // Clear the manualSymbolCache after transferring all tokens
    await redisClient.del("manualSymbolCache");
    console.log("manualSymbolCache cleared after transferring all tokens to symbolCache.");

    return {
      allTokens: allTokens.map((token) => ({
        ...token,
        verified: verifiedAddresses.has(token.address),
      })),
    };
  } catch (error) {
    console.error("Error fetching and storing tokens:", error);
    throw error;
  }
};
// Function to set token data in Redis
const setTokenInCache = async (token: any, verified: boolean) => {
  try {
    const key = `${token.address}:${token.symbol.toLowerCase()}`;
    await redisClient.hSet(
      "symbolCache",
      key,
      JSON.stringify({
        address: token.address,
        symbol: token.symbol,
        name: token.name,
        decimals: token.decimals.toString(),
        logoURI: token.logoURI,
        verified: verified.toString(),
        dailyVolume: token.daily_volume,
      })
    );
  } catch (error) {
    console.error("Error setting token in cache:", error);
    throw error;
  }
};
//Function to set in Manual Cahce(Tokens not found in Jup)
const setTokenInManualCache = async (token: any, verified: boolean) => {
  try {
    const key = `${token.address}:${token.symbol.toLowerCase()}`;
    await redisClient.hSet(
      "symbolCache",
      key,
      JSON.stringify({
        address: token.address,
        symbol: token.symbol,
        name: token.name,
        decimals: token.decimals.toString(),
        logoURI: token.logoURI,
        verified: verified.toString(),
        dailyVolume: token.daily_volume,
      })
    );
  } catch (error) {
    console.error("Error setting token in cache:", error);
    throw error;
  }
};
// Helper function to get token data from Redis
const getTokenFromCache = async (key: string) => {
  try {
    const tokenData = await redisClient.hGet("symbolCache", key);
    if (!tokenData) {
      return null;
    }

    return JSON.parse(tokenData);
  } catch (error) {
    console.error("Error getting token from cache:", error);
    return null;
  }
};


// Function to fetch tokens from Redis based on search term
const fetchTokensFromRedis = async (searchTerm: string) => {
  try {
    const escapedSearchTerm = searchTerm.replace(/\$/g, "\\$");
    const pattern = `(?:${escapedSearchTerm}|[^:]*:[^:]*${escapedSearchTerm.toLowerCase()}).*`;
    const keys = await redisClient.hKeys("symbolCache");
    const matchingKeys = keys.filter((key) =>
      key.match(new RegExp(pattern, "i"))
    );

    const tokens = await Promise.all(
      matchingKeys.map(async (key) => {
        const tokenData = await getTokenFromCache(key);
        return tokenData;
      })
    );

    return tokens
      .filter((token) => token !== null)
      .sort((a, b) => (b.dailyVolume || 0) - (a.dailyVolume || 0));
  } catch (error) {
    console.error("Error fetching tokens from Redis:", error);
    throw error;
  }
};

const fetchAndStoreTokenSymbolData = async (address: string): Promise<any> => {
  try {
    // First fetch token price data to see if it's already a blacklisted untradeable token
    const symbolPriceCacheEntry = await fetchTokensFromRedis(address);

    // We return success true and data null to indicate that the token is not tradable, and therefore shouldn't store metadata, but it was a valid fetch
    if (symbolPriceCacheEntry) {
      return {
        success: true,
        data: symbolPriceCacheEntry,
      };
    }

    // If it is, then proceed to fetch and store symbol data
    const response = await axios(
      `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          jsonrpc: "2.0",
          id: "text",
          method: "getAsset",
          params: {
            id: address,
          },
        }),
      }
    );
    const data = response?.data;
    const assetInfo = data?.result;

    // needed because if other services (such as the discord bot with /vision) were trying to get the symbol cache for a non-existent address (ie. 11111sGq8aPnqJyz6Jp1ASTK4PNLpB5KrD6XrfDjpump), it would be throwing an error and spamming logs
    if (!assetInfo) {
      return {
        success: false,
        error: `No asset info found for this address of: ${address}`,
      };
    }

    const cacheData:TokenData = {
      symbol: assetInfo.content.metadata.symbol,
      address: address,
      name: assetInfo.content.metadata.name,
      logoURI: assetInfo.content?.links?.image || "",
      decimals: assetInfo.token_info.decimals,
      verified: false,
      dailyVolume: 0,
    };

    const formattedSymbol =
      cacheData.address + ":" + cacheData.symbol.toLowerCase();
    const totalSupply =
      assetInfo.token_info.supply / 10 ** assetInfo.token_info.decimals;

    if (totalSupply === 1) {
      return {
        success: true,
        data: cacheData,
        error: "This is an nft, DO not store",
      };
    }

    await setTokenInCache(cacheData, false);
    await setTokenInManualCache(cacheData, false);

    const updateResponse = await updateAvailableSymbolsMap({
      [address]: cacheData,
    });

    if (!updateResponse.success) {
      console.error(
        "Error fetchAndStoreTokenSymbolData, updateKatanaAvailableSymbolsMap:",
        updateResponse.error
      );
    }

    return {
      success: true,
      data: cacheData,
    };
  } catch (error: any) {
    console.error(
      `Error fetchAndStoreTokenSymbolData for address = ${address}`,
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );

    return {
      success: false,
      error: ("Error fetching and storing token symbol data."),
    };
  }
};

// Initialize Redis when importing this module
initRedis().catch(console.error);

export { fetchAndStoreTokens, getTokenFromCache,fetchAndStoreTokenSymbolData,fetchTokensFromRedis };

