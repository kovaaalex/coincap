import { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import { useCryptos } from "../../hooks/useFetchCrypto";
import { ITEMS_ON_PAGE } from "../../const/cryptoUrl";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import type { ICrypto } from "../../types/crypto.types";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
    const [limit, setLimit] = useState(ITEMS_ON_PAGE);
    const [cryptoList, setCryptoList] = useState<ICrypto[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const previousDataRef = useRef<ICrypto[]>([]);
    
    const {
        data: cryptosData,
        isLoading: cryptosLoading,
        error: cryptosError,
        isFetching: cryptosFetching,
    } = useCryptos(limit, 0);

    const { ref, inView } = useInView();
    useEffect(() => {
        if (cryptosData) {
            setCryptoList(cryptosData);
            previousDataRef.current = cryptosData;
        }
        if (inView && !cryptosFetching && !isLoadingMore) {
            setIsLoadingMore(true);
            setLimit(prev => prev + ITEMS_ON_PAGE);
        }
        if (!cryptosFetching) {
            setIsLoadingMore(false);
        }
    }, [cryptosData, inView, cryptosFetching, isLoadingMore]);

    if (cryptosError) {
        return (
            <>
                <Header/>
                <p>Error: {cryptosError.message}</p>
            </>
        );
    }
    return (
        <>
            <Header/>
            <h1>Home</h1>
            <CryptoTable
                crypto={cryptoList}
                isLoading={cryptosLoading && cryptoList.length === 0}
            />
            <div ref={ref}>
                {isLoadingMore ? (
                    <p>Loading more...</p>
                ) : (
                    <p>Scroll to load more</p>
                )}
            </div>
        </>
    );
};

export default HomePage;