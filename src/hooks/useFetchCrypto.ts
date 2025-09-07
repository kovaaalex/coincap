import { useQuery } from '@tanstack/react-query';
import { cryptoApi } from "../utils/apiLoad";
import type { CryptoResponse } from "../types/crypto.types";

const useCryptos = (limit: number, offset: number) => {
    return useQuery({
        queryKey: ['cryptos', limit, offset],
        queryFn: () => cryptoApi.getCryptosList(limit, offset),
        select: (data: CryptoResponse) => data.data
    })
}
export default useCryptos;
