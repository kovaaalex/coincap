import axios from 'axios';
import { INTERVAL, URL, ITEMS_ON_PAGE } from '../const/cryptoUrl';
import type { CryptoResponse, ICrypto } from '../types/crypto.types';
const API_KEY = import.meta.env.VITE_COINCAP_API_KEY;
export const apiLoad = axios.create({
    baseURL: URL,
    timeout: INTERVAL,
    headers:{
        'Authorization': `Bearer ${API_KEY}`
    }
});
export const cryptoApi = {
    getAllCryptosList: (): Promise<CryptoResponse> => 
        apiLoad.get('/assets?limit=1000')
            .then(response => response.data)
            .catch(error => {
                console.error('Ошибка загрузки всех криптовалют:', error);
                throw new Error('Ошибка загрузки всех криптовалют');
            }),
    getCryptosList: (limit: number = ITEMS_ON_PAGE, offset: number = 50): Promise<CryptoResponse> => 
        apiLoad.get(`/assets?limit=${limit}&offset=${offset}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Ошибка загрузки криптовалют:', error);
                throw new Error('Ошибка загрузки криптовалют');
            }),
    getCryptoById: (id: string): Promise<ICrypto> =>
        apiLoad.get(`/assets/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Ошибка загрузки криптовалюты ${id}:`, error);
                throw new Error(`Ошибка загрузки криптовалюты ${id}:`);
            }),
    getCryptoByName: (searchTerm: string): Promise<CryptoResponse> =>
        apiLoad.get(`/assets?search=${searchTerm}`)
            .then(res => res.data)
            .catch(error => {
                console.error(`Ошибка загрузки криптовалюты ${searchTerm}:`, error);
                throw new Error(`Ошибка загрузки криптовалюты ${searchTerm}:`);
            }),
}