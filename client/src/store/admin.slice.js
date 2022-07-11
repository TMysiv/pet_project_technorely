import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {adminService} from "../services/admin.service";

export const getAllUsers = createAsyncThunk(
    'adminSlice/getAllUsers',
    async (_, {rejectWithValue}) => {
        try {
            return adminService.getUsers()
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
);

export const getAllCompanies = createAsyncThunk(
    'adminSlice/getAllCompanies',
    async (_, {rejectWithValue}) => {
        try {
            return adminService.getCompanies()
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
);

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState: {
        users: [],
        companies: [],
        error: null
    },
    reducers: {
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload.userId);
        },
        removeCompany: (state, action) => {
            state.companies = state.companies.filter(company => company.id !== action.payload.companyId);
        }
    },
    extraReducers: {
        [getAllUsers.fulfilled]: (state, action) => {
            state.users = action.payload
        },
        [getAllUsers.rejected]: (state, action) => {
            state.error = action.payload
        },
        [getAllCompanies.fulfilled]: (state, action) => {
            state.companies = action.payload
        },
        [getAllCompanies.rejected]: (state, action) => {
            state.error = action.payload
        },
    }
})

const adminReducer = adminSlice.reducer;
export default adminReducer;
export const {removeUser, removeCompany} = adminSlice.actions