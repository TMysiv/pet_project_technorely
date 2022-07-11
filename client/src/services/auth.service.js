import {api, apiWithInterceptor} from "./axios.service";

export const authService = {
    registration:  (data) => api.post('/auth/signup',data).then(value => value.data),

    login: (data) => api.post('/auth/signin', data).then(value => value.data),

    logout: () => apiWithInterceptor.get('/auth/logout').then(value => value.data)
}
