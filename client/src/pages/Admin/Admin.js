import React from 'react';
import {Link} from "react-router-dom";
import {Outlet, useNavigate} from "react-router";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Logout} from "@mui/icons-material";

import {authService} from "../../services/auth.service";

const Admin = () => {

const navigate = useNavigate();

    const logout = async () => {
        try {
            await authService.logout();
            localStorage.removeItem('token')
            navigate('/login')
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1 }}>
                        Pet_Project
                    </Typography>
                    <Typography
                        sx={{ flexGrow: 1 }}>
                        <Link to={''} className={'link'}>Profile</Link>
                    </Typography>
                    <Typography
                        sx={{ flexGrow: 1 }}>
                        <Link to={'users'} className={'link'}>Users</Link>
                    </Typography>
                    <Typography
                        sx={{ flexGrow: 1 }}>
                        <Link to={'companies'} className={'link'}>Companies</Link>
                    </Typography>

                    <Button color="inherit" onClick={logout} endIcon={<Logout/>}></Button>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </>
    );
};

export default Admin;