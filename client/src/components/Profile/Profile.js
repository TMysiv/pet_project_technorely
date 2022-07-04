import React, {useEffect, useState} from 'react';
import {userService} from "../../services/user.service";
import jwt_decode from "jwt-decode";

import User from "../User/User";

const Profile = () => {

    const [user,setUser] = useState({});

    const token = localStorage.getItem('token');
    const {userId} = jwt_decode(token);

    useEffect(() => {
        userService.getUserById(userId).then(value => setUser(value))
    },[])

    return (
        <>
            <User user={user}/>
        </>
    );
};

export default Profile;