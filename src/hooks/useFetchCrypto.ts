import { useQuery } from '@tanstack/react-query';
import { cryptoApi } from "../utils/apiLoad";
import type { CryptoResponse } from "../types/crypto.types";

export const useCryptos = (limit: number, offset: number) => {
    return useQuery({
        queryKey: ['cryptos', limit, offset],
        queryFn: () => cryptoApi.getCryptosList(limit, offset),
        select: (data: CryptoResponse) => data.data
    })
};
export const useAllCryptos = () => {
    return useQuery({
        queryKey: ['allCryptos'],
        queryFn: () => cryptoApi.getAllCryptosList(),
        select: (data: CryptoResponse) => data.data
    })
};
