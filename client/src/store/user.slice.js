import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {userService} from "../services/user.service";

export const getUserById = createAsyncThunk(
    'userSlice/getUserById',
    async ({userId}, {rejectWithValue}) => {
        try {
            return userService.getUserById(userId);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const updateUserById = createAsyncThunk(
    'userSlice/getUserById',
    async ({id,data}, {rejectWithValue}) => {
        try {
            return userService.updateUserById(id,data);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: {},
        error: null
    },
    reducers: {
        deleteUser: (state, action) => {
            state.user = {}
        }
    },
    extraReducers: {
        [getUserById.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [getUserById.rejected]: (state, action) => {
            state.error = action.payload
        },
        [updateUserById.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [updateUserById.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
})

const userReducer = userSlice.reducer;
export default userReducer;
export const {deleteUser} = userSlice.actions;
