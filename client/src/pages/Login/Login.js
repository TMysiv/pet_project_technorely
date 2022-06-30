import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";

import css from './style.css';
import {authService} from "../../services/auth.service";

const Login = () => {

    const [formError, setFormError] = useState([]);
    const {register, handleSubmit, reset} = useForm();
    const navigate = useNavigate()

    const login = async (data) => {
        try {
            const token = await authService.login(data);

            localStorage.setItem('token', token.toString());

            navigate('/')
        } catch (error) {
            setFormError(error.response.data.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(login)}>
                <div className="container_login">
                    <h1>Login</h1>
                    <hr/>

                    <label><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" {...register('email')} required/>

                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" {...register('password')} required/>

                    <hr/>

                    <button type="submit" className="loginbtn">Login</button>
                    {formError && formError.map(err => <li key={new Date().getDate()}>{err}</li>)}
                </div>

                <div className="container_login signup">
                    <p>You don't have an account yet? <Link to={'/signup'}>Sign up</Link></p>
                </div>
            </form>
        </>
    );
};

export default Login;