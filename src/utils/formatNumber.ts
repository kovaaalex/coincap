export const formatNumber = (num: number): string => {
    if (num === 0) return '0';
    const absNum = Math.abs(num);
    if (absNum >= 1e12) {
        return (num / 1e12).toFixed(2) + 't';
    } else if (absNum >= 1e9) {
        return (num / 1e9).toFixed(2) + 'b';
    } else if (absNum >= 1e6) {
        return (num / 1e6).toFixed(2) + 'm';
    } else if (absNum >= 1e3) {
        return (num / 1e3).toFixed(2) + 'k';
    } else {
        return num.toFixed(2);
    }
};