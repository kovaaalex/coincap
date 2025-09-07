import type { ICrypto } from "../../types/crypto.types"
import { formatNumber } from "../../utils/formatNumber";

const CryptoTableItem = ({item}: {item: ICrypto}) => {
    return (
        <tr>
            <td className="rank">{item.rank}</td>
            <td className="symbol">{item.symbol}</td>
            <td className="name">
                {item.explorer ? (
                    <a href={item.explorer} target="_blank">{item.name}</a>
                ) : ( 
                    item.name
                )}
            </td>
            <td className="priceUsd">${parseFloat(item.priceUsd).toFixed(2)}</td>
            <td className="marketCapUsd">${formatNumber(+item.marketCapUsd)}</td>
            <td className="vwap24Hr">${parseFloat(item.vwap24Hr).toFixed(2)}</td>
            <td className="supply">{formatNumber(+item.supply)}</td>
            <td className="volumeUsd24Hr">${formatNumber(+item.volumeUsd24Hr)}</td>
            <td className={`changePercent24Hr ${parseFloat(item.changePercent24Hr) >= 0 ? 'positive' : 'negative'}`}>
                {parseFloat(item.changePercent24Hr).toFixed(2)}%
            </td>
        </tr>
    )
}

export default CryptoTableItem;