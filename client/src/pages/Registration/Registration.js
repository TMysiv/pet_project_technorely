import React, {useState} from 'react';
import {Link} from "react-router-dom";

import {useForm} from "react-hook-form";
import {authService} from "../../services/auth.service";
import css from './style.css';

const Registration = () => {
    const [formError, setFormError] = useState([]);

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const createUser = async (data) => {

        try {
            const user = await authService.registration(data)
            reset()
        } catch (error) {
            setFormError(error.response.data.message)
        }
    }

    return (
        <div className={'wrap'}>
            <div className={'wrap_form'}>
                <div className={'form_header'}>
                    <h2>Registration</h2>
                    <br/>
                    <h5>Required field*</h5>
                </div>
                <form onSubmit={handleSubmit(createUser)} className={'form_registration'}>
                    <div>
                        <label>Email*<input type="text" defaultValue={''} {...register('email')}/></label>
                    </div>
                    <div>
                        <label>Password*<input type="text" defaultValue={''} {...register('password')}/></label>
                    </div>
                    <div>
                        <label>Phone*<input type="text" defaultValue={''} {...register('phone')} /></label>
                    </div>
                    <div>
                        <label>FirstName*<input type="text" defaultValue={''} {...register('firstName')} /></label>
                        </div>
                    <div>
                        <label>LastName*<input type="text" defaultValue={''} {...register('lastName')}/></label>
                    </div>
                    <div>
                        <label>NickName*<input type="text" defaultValue={''} {...register('nickName')}/></label>
                    </div>
                    <div>
                        <label>Description*<input type="text" defaultValue={''} {...register('description')}/></label>
                    </div>
                    <div>
                        <label>Position*<input type="text" defaultValue={''} {...register('position')}/></label>
                    </div>
                    <button>Send</button>

                </form>
                <Link to={'/signin'}>SignIn</Link>
                    {formError && formError.map(err => <span>{err}</span>)}
            </div>
        </div>
    );
};

export default Registration;