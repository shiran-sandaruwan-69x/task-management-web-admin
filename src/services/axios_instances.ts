import axios, { AxiosInstance } from 'axios';

// Get Token From local storage
const tokenString = localStorage.getItem('token');
const token: string | null = tokenString ? (JSON.parse(tokenString) as string) : null;
const VITE_BASE_URL_SERVICE: string = import.meta.env.VITE_BASE_URL_SERVICE as string;

const axiosApi: AxiosInstance = axios.create({
    baseURL: VITE_BASE_URL_SERVICE,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token ? `${token}` : '',
        allowedHeaders: '*'
    }
});

export { axiosApi };