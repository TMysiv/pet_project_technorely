import {apiWithInterceptor} from "./axios.service";

export const userService = {
    getUserById: (id) => apiWithInterceptor.get(`users/${id}`).then(value => value.data),
    updateUserById: (id,data) => apiWithInterceptor.put(`users/${id}`,data).then(value => value.data),
    deleteUserById: (id) => apiWithInterceptor.delete(`users/${id}`)
}