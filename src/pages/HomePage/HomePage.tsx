import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import useCryptos from "../../hooks/useFetchCrypto";
import { ITEMS_ON_PAGE } from "../../const/cryptoUrl";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import type { ICrypto } from "../../types/crypto.types";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
    const [page, setPage] = useState(0);
    const [cryptoList, setCryptoList] = useState<ICrypto[]>([])
    const limit = ITEMS_ON_PAGE;
    const {
        data: cryptosData,
        isLoading: cryptosLoading,
        error: cryptosError,
    } = useCryptos(limit, (page - 1) * limit);
    const { ref, inView } = useInView();

    useEffect(() => {
        if(cryptosData) {
            if (page === 0)
                setCryptoList(cryptosData)
            else 
                setCryptoList((prev) => [...prev, ...cryptosData])
        }
    }, [cryptosData]);
    useEffect(() => {
        if(inView) {
            setPage(prev => prev + 1);
        }
    }, [inView]);
    return(
        <>
            <Header/>
            <h1>Home</h1>
            <CryptoTable
                crypto={cryptoList}
                isLoading={cryptosLoading && page === 0}
            />
            <div ref={ref}>
                <p>Load more</p>
            </div>
        </>
    )
}
export default HomePage;