import {apiWithInterceptor} from "./axios.service";

export const adminService = {
    getUsers: () => apiWithInterceptor.get('admin/allUsers').then(value => value.data),
    getCompanies: () => apiWithInterceptor.get('admin/allCompanies').then(value => value.data),
    updateUserRole:(id) => apiWithInterceptor.get(`admin/role/${id}`).then(value => value.data),
    deleteUser: (id) => apiWithInterceptor.delete(`admin/user/${id}`),
    deleteCompany: (id) => apiWithInterceptor.delete(`admin/company/${id}`),
}