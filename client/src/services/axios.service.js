import axios from "axios";
import swal from 'react-swal'

const baseURL = 'http://localhost:5200';

const api = axios.create({
    baseURL
})

const apiWithInterceptor = axios.create({
    baseURL
})

apiWithInterceptor.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})
apiWithInterceptor.interceptors.response.use((config) => {
        return config;
    }, (error) => {

    if ( error.response.status ===401) {
        window.location.href = 'login';
    } else {
        return Promise.reject(error);
    }
    }
)

export {api, apiWithInterceptor}
