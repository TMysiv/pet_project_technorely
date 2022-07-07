import React from 'react';
import {Outlet, useNavigate} from "react-router";

import css from './style.css';
import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import {authService} from "../../services/auth.service";
import {Link} from "react-router-dom";
import {Logout} from "@mui/icons-material";


const Layout = () => {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            await authService.logout();
            localStorage.removeItem('token');
            navigate('/login');

        } catch (e) {
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
                        <Link to={'companies'} className={'link'}>Companies</Link>
                    </Typography>

                    <Button color="inherit" onClick={logout} endIcon={<Logout/>}></Button>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </>
    );
};

export default Layout;