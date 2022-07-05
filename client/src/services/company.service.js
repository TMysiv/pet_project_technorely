import {apiWithInterceptor} from "./axios.service";

export const companyService = {
    getAll: (id) => apiWithInterceptor.get(`companies/${id}/all`).then(value => value.data),
    createCompany: (id, data) => apiWithInterceptor.post(`companies/${id}`, data).then(value => value.data),
}