import { useQuery } from '@tanstack/react-query';
import { cryptoApi } from "../utils/apiLoad";
import type { CryptoResponse, ICrypto } from "../types/crypto.types";

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
export const useCryptoDetail = (id: string) => {
    return useQuery<ICrypto, Error>({
        queryKey: ['cryptoDetail', id],
        queryFn: () => cryptoApi.getCryptoById(id),
        enabled: !!id,
        refetchInterval: 10 * 1000,
    });
};
export const useCryptoHistory = (id: string, interval: string = 'd1') => {
    return useQuery({
        queryKey: ['crypto-history', id, interval],
        queryFn: () => cryptoApi.getCryptoHistory(id, interval),
        enabled: !!id,
    });
};
export const useSearchCryptos = (term: string) => {
    return useQuery({
        queryKey: ['cryptoTerm', term],
        queryFn: () => cryptoApi.getCryptoByName(term),
        enabled: term.length > 0,
    })
}