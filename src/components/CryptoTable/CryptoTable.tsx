import type { ICrypto } from "../../types/crypto.types";

interface CryptoTableProps {
  crypto: ICrypto[];
  isLoading: boolean;
}
const CryptoTable: React.FC<CryptoTableProps> = ({crypto, isLoading}) => {
    if (isLoading) {
        return <div className="loading">Загрузка криптовалют</div>;
    }
    return <ul>
        {crypto.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
}
export default CryptoTable;