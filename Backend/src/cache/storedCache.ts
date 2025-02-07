import { getAllTokensFromCache } from "./cache";

interface TokenData {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI: string;
    verified?: boolean;
    dailyVolume: number | null;
  }
  let CurrentStoredCache: Record<string, TokenData[]> | null = null;

// Function to set the current stored cache
export const setCurrentStoredCache = (cache: Record<string, TokenData[]>) => {
  CurrentStoredCache = cache;
};

// Function to get the current stored cache
export const getCurrentStoredCache = async (): Promise<Record<string, TokenData[]> | null> => {
  if (!CurrentStoredCache) {
    // Fetch and set the cache if it's not already set
    const SymbolDataResponse = await getAllTokensFromCache();
    if (SymbolDataResponse) {
      const mappedData = SymbolDataResponse.reduce((acc:any, curr:any) => {
        const { asset } = curr;
        acc[asset] = curr;
        return acc;
      }, {} as Record<string, TokenData>);
      
      // Convert mappedData to the expected TokenData format
      const formattedCache: Record<string, TokenData[]> = Object.entries(mappedData).reduce((acc, [key, value]) => {
        acc[key] = [{
            address: (value as TokenData).address,
            symbol: (value as TokenData).symbol,
            name: (value as TokenData).name || (value as TokenData).symbol,
            decimals: (value as TokenData).decimals,
            logoURI: (value as TokenData).logoURI || '',
            verified: (value as TokenData).verified || false,
            dailyVolume: (value as TokenData).dailyVolume || 0
          }];
        return acc;
      }, {} as Record<string, TokenData[]>);

      setCurrentStoredCache(formattedCache);
      return formattedCache
    }
  }
  return CurrentStoredCache;
};

export const updateAvailableSymbolsMap = async (data: Record<string, TokenData>) => {
  try {
    const katanaAvailableSymbolsData = await getCurrentStoredCache();
    const combinedData = katanaAvailableSymbolsData
      ? { ...katanaAvailableSymbolsData, ...data }
      : { ...data };
    setCurrentStoredCache(combinedData as Record<string, TokenData[]>);
    return { success: true, data: combinedData };
  } catch (error) {
    console.error('Error updating available symbols map:', error);
    return { success: false, error: 'Failed to update available symbols map' };
  }
};