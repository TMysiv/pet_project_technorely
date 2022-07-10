import React from 'react';
import {Navigate, useLocation} from "react-router";

const RequireAuth = ({children}) => {
    try {
        const location = useLocation();

        const token = localStorage.getItem('token');

        if (!token) {
            return <Navigate to={'/login'} state={location}/>
        }

    }catch (e) {
        console.log(e)
    }

    return children;
};

export default RequireAuth;