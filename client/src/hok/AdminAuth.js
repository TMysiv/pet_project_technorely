import React from 'react';
import jwt_decode from 'jwt-decode';

const AdminAuth = ({children}) => {

    const token = localStorage.getItem('token');
    const user = jwt_decode(token);

    if (user.role !== 'admin'){
        return <h1>No access rights</h1>
    }

    return children
};

export default AdminAuth;