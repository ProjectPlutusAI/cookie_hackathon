export interface TokenTransfer {
  tokenAmount: number;
  userWallet: string;
}

export interface TransferData {
  signature: string;
  tokenTransfers: TokenTransfer[];
}

export interface BundleData {
  totalTransactions: number;
  transfers: TransferData[];
  bundledPercentage:number,
  totalBundledAmount:number;
}

export interface BundleCheckerResponse {
  success: boolean;
  bundleData?: BundleData;
  error?: string;
} 