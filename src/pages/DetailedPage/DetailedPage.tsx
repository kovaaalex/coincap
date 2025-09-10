import { useNavigate, useParams } from "react-router-dom";
import { useCryptoDetail, useCryptoHistory } from "../../hooks/useFetchCrypto";
import { useEffect } from "react";
import Header from "../../components/Header/Header";
import PriceChart from "../../components/PriceChange/PriceChange";
import { formatNumber } from "../../utils/formatNumber";
import styles from './DetailedPage.module.css';
import { HOMEPAGE__URL } from "../../const/routes";

const DetailedPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        data: crypto,
        isLoading: detailLoading,
        error: detailError,
    } = useCryptoDetail(id!);
    const {
        data: priceHistory,
        isLoading: historyLoading,
    } = useCryptoHistory(id!, 'd1');
    
    useEffect(() => {
        if (detailError) {
            navigate(HOMEPAGE__URL);
        }
    }, [detailError, navigate]);
    if (detailLoading) {
        return (
            <>
                <Header />
                <div className={styles.loading}>Loading cryptocurrency details...</div>
            </>
        );
    }
    if (!crypto) {
        return (
            <>
                <Header />
                <div className={styles.error}>Cryptocurrency not found</div>
            </>
        );
    }
    const changePercent = parseFloat(crypto.changePercent24Hr);
    const isPositive = changePercent >= 0;
    return (
        <>
            <Header/>
            <div className={styles.container}>
                <div className={styles.priceSection}>
                    <h2 className={styles.title}>{crypto.name} ({crypto.symbol})</h2>
                    <div className={styles.currentPrice}>
                        ${parseFloat(crypto.priceUsd).toFixed(2)}
                    </div>
                    <div className={`${styles.priceChange} ${isPositive ? styles.positive : styles.negative}`}>
                        {isPositive ? '+' : ''}{changePercent.toFixed(2)}% (24h)
                    </div>
                </div>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <h4 className={styles.statTitle}>Market Cap</h4>
                        <p className={styles.statValue}>${formatNumber(parseFloat(crypto.marketCapUsd))}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h4 className={styles.statTitle}>Volume (24h)</h4>
                        <p className={styles.statValue}>${formatNumber(parseFloat(crypto.volumeUsd24Hr))}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h4 className={styles.statTitle}>VWAP (24h)</h4>
                        <p className={styles.statValue}>${parseFloat(crypto.vwap24Hr).toFixed(2)}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h4 className={styles.statTitle}>Circulating Supply</h4>
                        <p className={styles.statValue}>{formatNumber(parseFloat(crypto.supply))} {crypto.symbol}</p>
                    </div>
                </div>  
            </div>
            <div className={styles.chartSection}>
                <h2 className={styles.chartTitle}>Price History (Last 30 Days)</h2>
                <PriceChart 
                    data={priceHistory?.data || []} 
                    isLoading={historyLoading}
                />
            </div>
        </>
    );
};

export default DetailedPage;