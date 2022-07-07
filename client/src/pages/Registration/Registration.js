import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";

import {authService} from "../../services/auth.service";
import css from './style.css';


const Registration = () => {
    const [formError, setFormError] = useState([]);
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm();

    const createUser = async (data) => {

        try {
            await authService.registration(data);

            navigate('/login');

        } catch (error) {
            setFormError(error.response.data.message)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(createUser)}>
                <div className="container_registration">
                    <h1>Registration</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>

                    <label><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" {...register('email')}/>

                    <label><b>Password</b></label>
                    <input type="text" placeholder="Enter Password" {...register('password')} required/>

                    <label><b>Phone</b></label>
                    <input type="text" placeholder="Enter Phone" {...register('phone')} required/>

                    <label><b>Last name</b></label>
                    <input type="text" placeholder="Enter Last name" {...register('lastName')} required/>

                    <label><b>First name</b></label>
                    <input type="text" placeholder="Enter First name" {...register('firstName')} required/>

                    <label><b>Nick name</b></label>
                    <input type="text" placeholder="Enter Nick name" {...register('nickName')} required/>

                    <label><b>Description</b></label>
                    <input type="text" placeholder="Enter Description" {...register('description')} required/>

                    <label><b>Position</b></label>
                    <input type="text" placeholder="Enter Position" {...register('position')} required/>

                    <hr/>

                    <button type="submit" className="registerbtn">Registration</button>
                    {formError && formError.map(err => <li key={new Date().getDate()}>{err}</li>)}
                </div>

                <div className="container_registration signin">
                    <p>Already have account? <Link to={'/login'}>Sign in</Link></p>
                </div>
            </form>
        </>
    );
};

export default Registration;