import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {companyService} from "../services/company.service";

export const getCompaniesById = createAsyncThunk(
    'companySlice/getCompaniesById',
    async ({userId}, {rejectWithValue}) => {
        try {
            return companyService.getAll(userId);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const createCompany = createAsyncThunk(
    'companySlice/createCompany',
    async ({userId,data}, {rejectWithValue}) => {
        try {
            return companyService.createCompany(userId,data);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const companySlice = createSlice({
    name: 'companySlice',
    initialState: {
        companies: [],
        error: null
    },
    reducers: {
        deleteCompany: (state,action) =>{
             state.companies = state.companies.filter(company => company.id !== action.payload.companyId);
        }
    },
    extraReducers: {
        [getCompaniesById.fulfilled]: (state, action) => {
            state.companies = action.payload
        },
        [getCompaniesById.rejected]: (state, action) => {
            state.error = action.payload
        },
        [createCompany.fulfilled]: (state, action) => {
            state.companies = state.companies.push(action.payload)
        },
        [createCompany.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
})

const companyReducer = companySlice.reducer;
export default companyReducer;
export const {deleteCompany} = companySlice.actions