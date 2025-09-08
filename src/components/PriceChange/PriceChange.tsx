import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import type { PriceChartProps } from '../../types/priceHistory.types';

const PriceChart: React.FC<PriceChartProps> = ({ data, isLoading }) => {
    if (isLoading) {
        return <div className="chart-loading">Loading chart data...</div>;
    }

    const chartData = data.map(item => ({
        date: new Date(item.time).toLocaleDateString(),
        price: parseFloat(item.priceUsd),
        time: item.time,
        fullDate: new Date(item.time).toLocaleString()
    }));

    if (chartData.length === 0) {
        return <div className="chart-loading">No data available for chart</div>;
    }

    return (
        <div className="price-chart">
            <h3>Price History</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 30,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="date"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        domain={['dataMin - 100', 'dataMax + 100']}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />
                    <Tooltip 
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                        labelFormatter={(label, payload) => {
                            if (payload && payload[0]) {
                                return `Date: ${payload[0].payload.fullDate}`;
                            }
                            return `Date: ${label}`;
                        }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: '#8884d8' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;