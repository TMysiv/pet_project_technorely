import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./user.slice";
import companyReducer from "./company.slice";

const store = configureStore({
    reducer:{
        userReducer,
        companyReducer
    }
})

export default store