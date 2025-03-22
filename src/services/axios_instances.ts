import axios, { AxiosInstance } from 'axios';
import {SignInResType} from "@/auth/auth-types/AuthTypes.ts";

const savedUser = localStorage.getItem("user");
const parsedUser:SignInResType = JSON.parse(savedUser);
const token: string | null = parsedUser?.token ? parsedUser?.token : null;
const VITE_BASE_URL: string = process.env.VITE_BASE_URL as string;

const axiosApi: AxiosInstance = axios.create({
    baseURL: VITE_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        allowedHeaders: '*'
    }
});

export { axiosApi };