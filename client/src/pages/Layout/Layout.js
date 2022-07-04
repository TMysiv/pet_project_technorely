import React from 'react';
import {Outlet} from "react-router";
import {Link} from "react-router-dom";

import css from './style.css';
import {authService} from "../../services/auth.service";

const Layout = () => {

    const logout = async () => {
        try {
            await authService.logout();
            localStorage.removeItem('token')
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className={'container_layout'}>
                <div className={'container_layout_header'}>

                    <div className={'header_link'}>
                        <Link to={''}>Profile</Link>
                    </div>

                    <div className={'header_link'}>
                        <Link to={'companies'}>Companies</Link>
                    </div>

                    <div className={'header_logout'}>
                        <Link to={'login'} onClick={logout} >Logout</Link>
                    </div>

                </div>
                <div className={'container_layout_outlet'}>
                    <Outlet/>
                </div>
            </div>
        </>
    );
};

export default Layout;