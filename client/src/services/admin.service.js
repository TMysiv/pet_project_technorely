import {apiWithInterceptor} from "./axios.service";

export const adminService = {
    getUser: () => apiWithInterceptor.get('admin/allUsers').then(value => value.data)
}