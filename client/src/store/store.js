import {configureStore} from '@reduxjs/toolkit';

import userReducer from "./user.slice";
import companyReducer from "./company.slice";
import adminReducer from "./admin.slice";

const store = configureStore({
    reducer:{
        userReducer,
        companyReducer,
        adminReducer
    }
})

export default store