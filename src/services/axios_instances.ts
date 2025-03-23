import axios, { AxiosInstance } from 'axios';

const VITE_BASE_URL: string = process.env.VITE_BASE_URL as string;

const axiosApi: AxiosInstance = axios.create({
    baseURL: VITE_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        allowedHeaders: '*'
    }
});

export { axiosApi };