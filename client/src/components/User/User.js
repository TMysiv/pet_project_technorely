import React from 'react';

import css from './style.css'
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const User = ({user}) => {

    const navigate = useNavigate();

    const updateUser = () =>{
        navigate('update')
    }

    return (
        <div className={'user'}>
            <h3>Information:</h3>
            <br/>
                <ul>
                    <li>Name: {user.firstName}</li>
                    <li>Surname: {user.lastName}</li>
                    <li>Email: {user.email}</li>
                    <li>Nickname: {user.nickName}</li>
                    <li>Phone: {user.phone}</li>
                    <li>Description: {user.description}</li>
                    <li>Position: {user.position}</li>
                </ul>

            <button onClick={updateUser}>Update</button>

        </div>
    );
};

export default User;