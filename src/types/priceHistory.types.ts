import type { ICryptoHistory } from "./crypto.types";

export interface PriceChartProps {
    data: ICryptoHistory[];
    isLoading: boolean;
}