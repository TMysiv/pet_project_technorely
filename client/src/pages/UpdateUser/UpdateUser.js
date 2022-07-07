import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {updateUserById} from "../../store/user.slice";
import css from './style.css';

const UpdateUser = () => {

    const {user} = useSelector(state => state['userReducer']);
    const userId = user.id;

    const dispatch = useDispatch()

    const [formError,setFormError] = useState();
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm();

    const updateUser =  (data) => {

        try {
            dispatch(updateUserById({userId,data}))

            navigate('/');

        } catch (error) {
            setFormError(error.response.data.message)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(updateUser)}>
                <div className="container_update">
                    <h1>Update User</h1>

                    <hr/>

                    <label><b>First name</b></label>
                    <input type="text" placeholder="Enter First name" {...register('firstName')} required />

                    <label><b>Last name</b></label>
                    <input type="text" placeholder="Enter Last name" {...register('lastName')} required />

                    <label><b>Nick name</b></label>
                    <input type="text" placeholder="Enter Nick name" {...register('nickName')} required />

                    <label><b>Description</b></label>
                    <input type="text" placeholder="Enter Description" {...register('description')} required />

                    <label><b>Position</b></label>
                    <input type="text" placeholder="Enter Position" {...register('position')} required />

                    <hr/>

                    <button type="submit" className="updatebtn">Update</button>
                    {formError && formError.map(err =><li key={new Date().getDate()}>{err}</li>)}
                </div>

            </form>
        </div>
    );
};

export default UpdateUser;