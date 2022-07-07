import React, {useEffect} from 'react';
import jwt_decode from "jwt-decode";

import User from "../User/User";
import {useDispatch, useSelector} from "react-redux";
import {getUserById} from "../../store/user.slice";

const Profile = () => {

    const {user,error} = useSelector(state => state['userReducer']);

    const dispatch = useDispatch();

    const token = localStorage.getItem('token');
    const {userId} = jwt_decode(token);

    useEffect(() => {
       dispatch(getUserById({userId}))
    }, [])

    return (
        <>
            <User user={user}/>
            {error && <h2>{error}</h2>}
        </>
    );
};

export default Profile;