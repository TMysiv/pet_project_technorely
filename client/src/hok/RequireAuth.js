import React from 'react';
import {Navigate, useLocation} from "react-router";

const RequireAuth = ({children}) => {

    const location = useLocation();

    const token = localStorage.getItem('token');

    if (!token){
        return <Navigate to={'/login'} state={location}/>
    }

    return children;
};

export default RequireAuth;