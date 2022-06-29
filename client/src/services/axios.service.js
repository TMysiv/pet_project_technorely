import axios from "axios";

const baseURL = 'http://localhost:5200';

const api = axios.create({
    baseURL
})

const apiWithInterceptor = axios.create({
    baseURL
})

apiWithInterceptor.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

export  {api,apiWithInterceptor}
