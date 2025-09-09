import { useEffect, useState, useRef, useCallback } from "react";
import Header from "../../components/Header/Header";
import { useCryptos, useSearchCryptos } from "../../hooks/useFetchCrypto";
import { ITEMS_ON_PAGE } from "../../const/cryptoUrl";
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import type { ICrypto } from "../../types/crypto.types";
import { useInView } from "react-intersection-observer";
import SearchInput from "../../components/InputSearch/InputSearch";
import styles from './HomePage.module.css';

const HomePage = () => {
    const [limit, setLimit] = useState(ITEMS_ON_PAGE);
    const [cryptoList, setCryptoList] = useState<ICrypto[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const previousDataRef = useRef<ICrypto[]>([]);
    const {
        data: cryptosData,
        isLoading: cryptosLoading,
        error: cryptosError,
        isFetching: cryptosFetching,
    } = useCryptos(limit, 0);
    const {
        data: searchResults,
        isLoading: searchLoading,
        error: searchError,
        isFetching: searchFetching,
    } = useSearchCryptos(searchTerm);
    const { ref, inView } = useInView();
    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);
        setIsSearching(term.length > 0);
        setLimit(ITEMS_ON_PAGE);
    }, []);

    useEffect(() => {
        if (isSearching && searchResults?.data) {
            setCryptoList(searchResults.data);
        } else if (cryptosData) {
            setCryptoList(cryptosData);
            previousDataRef.current = cryptosData;
        }
    }, [cryptosData, searchResults, isSearching]);

    useEffect(() => {
        if (inView && !cryptosFetching && !isLoadingMore && !isSearching) {
            setIsLoadingMore(true);
            setLimit(prev => prev + ITEMS_ON_PAGE);
        }
    }, [inView, cryptosFetching, isLoadingMore, isSearching]);
    useEffect(() => {
        if (!cryptosFetching) {
            setIsLoadingMore(false);
        }
    }, [cryptosFetching]);
    const error = cryptosError || searchError;
    if (error) {
        return (
            <>
                <Header/>
                <div className={styles.error}>Error: {error.message}</div>
            </>
        );
    }
    const isLoading = cryptosLoading || searchLoading;
    const showLoading = isLoading && cryptoList.length === 0;
    return (
        <>
            <Header/>
            <div className={styles.container}>
                <h1 className={styles.title}>Crypto Market</h1>
                <SearchInput 
                    onSearch={handleSearch}
                    placeholder="Search cryptocurrencies..."
                    isLoading={searchLoading || searchFetching}
                />
                
                <CryptoTable
                    crypto={cryptoList}
                    isLoading={showLoading}
                />
                
                {!isSearching && (
                    <div ref={ref} className={styles.loadMoreTrigger}>
                        {isLoadingMore ? (
                            <div className={styles.loadingText}>Loading more cryptocurrencies...</div>
                        ) : (
                            <div className={styles.scrollText}>Scroll to load more</div>
                        )}
                    </div>
                )}    
                {isSearching && searchResults?.data?.length === 0 && !searchLoading && (
                    <div className={styles.noResults}>
                        No cryptocurrencies found for "{searchTerm}"
                    </div>
                )}
            </div>
        </>
    );
};

export default HomePage;