export interface ICrypto {
    id: string,
    rank: string,
    symbol: string,
    name: string,
    supply: string,
    maxSupply: string | null,
    marketCapUsd: string,
    volumeUsd24Hr: string,
    priceUsd: string,
    changePercent24Hr: string,
    vwap24Hr: string,
    explorer: string | null,
    tokens: {
        [chainId: string]: string[],
    }
};
export interface CryptoResponse {
    timestamp: number;
    data: ICrypto[];
}
export interface CryptoTableProps {
  crypto: ICrypto[];
  isLoading: boolean;
}
export interface ICryptoHistory {
    priceUsd: string;
    time: number;
    date: string;
    circulatingSupply?: string;
}
export interface CryptoHistoryResponse {
    data: ICryptoHistory[];
    timestamp: number;
}