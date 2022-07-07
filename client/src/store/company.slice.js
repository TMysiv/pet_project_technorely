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

const companySlice = createSlice({
    name: 'companySlice',
    initialState: {
        companies: [],
        error: null
    },
    reducers: {},
    extraReducers: {
        [getCompaniesById.fulfilled]: (state, action) => {
            state.companies = action.payload
        },
        [getCompaniesById.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
})

const companyReducer = companySlice.reducer;
export default companyReducer;