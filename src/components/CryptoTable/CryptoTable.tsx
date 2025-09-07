import type { ICrypto } from "../../types/crypto.types";
import CryptoTableItem from "../CryptoTableItem/CryptoTableItem";

interface CryptoTableProps {
  crypto: ICrypto[];
  isLoading: boolean;
}
const CryptoTable: React.FC<CryptoTableProps> = ({crypto, isLoading}) => {
    if (isLoading) {
        return <div className="loading">Загрузка криптовалют</div>;
    }
    return <div>
        <thead className="table__header">
            <tr className="header__row">
                <th className="rank">Rank</th>
                <th className="symbol">Symbol</th>
                <th className="name">Name</th>
                <th className="priceUsd">Price</th>
                <th className="marketCapUsd">Market Cap</th>
                <th className="vwap24Hr">VWAP(24hr)</th>
                <th className="supply">Supply</th>
                <th className="volumeUsd24Hr">Volume(24hr)</th>
                <th className="changePercent24Hr">Change(24hr)</th>
            </tr>
        </thead>
        <tbody>
            {crypto.map(item => <CryptoTableItem  key={item.id} item={item}/>)}
        </tbody>
        
    </div>
}
export default CryptoTable;