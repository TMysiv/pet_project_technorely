import React from 'react';
import {Link} from "react-router-dom";
import {Outlet} from "react-router";
import {authService} from "../../services/auth.service";
import css from './style.css';

const Admin = () => {


    const logout = async () => {
        try {
            await authService.logout();
            localStorage.removeItem('token')
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <div className={'container_admin'}>
                <div className={'container_admin_header'}>

                    <div className={'header'}>
                        <Link to={'users'}>Users</Link>
                    </div>

                    <div className={'header'}>
                        <Link to={'companies'}>Companies</Link>
                    </div>

                    <div className={'header_logout'}>
                        <Link to={'login'} onClick={logout} >Logout</Link>
                    </div>

                </div>
                <div className={'container_admin_outlet'}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Admin;