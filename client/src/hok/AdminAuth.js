import React from 'react';
import jwt_decode from 'jwt-decode';
import {Typography, Box} from "@mui/material";
import {Navigate, useLocation} from "react-router";

const AdminAuth = ({children}) => {

    const location = useLocation();

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to={'/login'} state={location}/>
    }
    const user = jwt_decode(token);

    if (user.role !== 'admin') {

        return <Box display={"flex"} justifyContent={"center"} mt={3}>
            <Typography variant={"h3"}>No access rights</Typography>

        </Box>
    }

    return children
};

export default AdminAuth;