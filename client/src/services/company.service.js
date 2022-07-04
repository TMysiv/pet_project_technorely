import {apiWithInterceptor} from "./axios.service";

export const companyService = {
    // getAll: () =>,
    createCompany: (id,data) =>apiWithInterceptor.post(`companies/${id}`,data)
}