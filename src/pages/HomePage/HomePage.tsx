import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import useCryptos from "../../hooks/useFetchCrypto";
import { ITEMS_ON_PAGE } from "../../const/cryptoUrl";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import type { ICrypto } from "../../types/crypto.types";

const HomePage = () => {
    const [page, setPage] = useState(0);
    const [cryptoList, setCryptoList] = useState<ICrypto[]>([])
    const limit = ITEMS_ON_PAGE;
    const {
        data: cryptosData,
        isLoading: cryptosLoading,
        error: cryptosError,
    } = useCryptos(limit, page * limit);
    useEffect(() => {
        if(cryptosData) {
            if (page === 0)
                setCryptoList(cryptosData)
            else 
                setCryptoList((prev) => [...prev, ...cryptosData])
        }
    }, [cryptosData])
    return(
        <>
            <Header/>
            <h1>Home</h1>
            <CryptoTable
                crypto={cryptoList}
                isLoading={cryptosLoading && page === 0}
            />
        </>
    )
}
export default HomePage;