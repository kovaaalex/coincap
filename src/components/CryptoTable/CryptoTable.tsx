import { useMemo, useState } from "react";
import type { CryptoTableProps } from "../../types/crypto.types";
import CryptoTableItem from "../CryptoTableItem/CryptoTableItem";
import type { SortDirection, SortField } from "../../types/sort.types";
import styles from './CryptoTable.module.css';
const CryptoTable: React.FC<CryptoTableProps> = ({crypto, isLoading}) => {
    const [sortField, setSortField] = useState<SortField>('rank');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const sortedCrypto = useMemo(() => {
        if(!crypto.length) return[];
        return [...crypto].sort((a, b) => {
            let value1: any = a[sortField];
            let value2: any = b[sortField];
            if (sortField === 'rank' || sortField === 'priceUsd' || 
                sortField === 'marketCapUsd' || sortField === 'vwap24Hr' ||
                sortField === 'supply' || sortField === 'volumeUsd24Hr' ||
                sortField === 'changePercent24Hr') {
                value1 = +value1;
                value2 = +value2;
            }
            if (value1 < value2) return sortDirection === 'asc' ? -1 : 1;
            if (value1 > value2) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        })
    }, [crypto, sortField, sortDirection]);
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };
    if (isLoading) {
        return <div className="loading">Загрузка криптовалют</div>;
    }
    return <table className={styles.table} cellSpacing="0">
        <thead className="table__header">
            <tr className="header__row">
                <th className="rank" onClick={() => handleSort('rank')}>Rank</th>
                <th className="symbol" onClick={() => handleSort('symbol')}>Symbol</th>
                <th className="name" onClick={() => handleSort('name')}>Name</th>
                <th className="priceUsd" onClick={() => handleSort('priceUsd')}>Price</th>
                <th className="marketCapUsd" onClick={() => handleSort('marketCapUsd')}>Market Cap</th>
                <th className="vwap24Hr" onClick={() => handleSort('vwap24Hr')}>VWAP(24hr)</th>
                <th className="supply" onClick={() => handleSort('supply')}>Supply</th>
                <th className="volumeUsd24Hr" onClick={() => handleSort('volumeUsd24Hr')}>Volume(24hr)</th>
                <th className="changePercent24Hr" onClick={() => handleSort('changePercent24Hr')}>Change(24hr)</th>
            </tr>
        </thead>
        <tbody>
            {sortedCrypto.map(item => <CryptoTableItem  key={item.id} item={item}/>)}
        </tbody>
    </table>
}
export default CryptoTable;