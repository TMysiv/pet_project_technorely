import React from 'react';
import {Link} from "react-router-dom";
import {Outlet} from "react-router";

import css from './style.css';

const Layout = () => {
    return (
        <>
            <div className={'container_layout'}>
                <div className={'container_layout_header'}>
                    <div className={'header_menu'}>
                        {/*<Link to={'profile'}>Profile</Link>*/}
                        {/*<Link to={'companies'}>Companies</Link>*/}
                        <div className={'header_menu_link'}>Profile</div>
                        <div className={'header_menu_link'}>Companies</div>
                    </div>
                    <button>Log out</button>
                </div>
                <Outlet/>
            </div>
        </>
    );
};

export default Layout;