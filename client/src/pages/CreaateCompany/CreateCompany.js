import React,{useState} from 'react';
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";

import {companyService} from "../../services/company.service";
import jwt_decode from "jwt-decode";

import css from './style.css'

const CreateCompany = () => {

    const [formError, setFormError] = useState([]);
    const navigate = useNavigate();

    const {register, handleSubmit, reset} = useForm();

    const token = localStorage.getItem('token');
    const {userId} = jwt_decode(token);

    const createCompany = async (data) => {

        try {
            await companyService.createCompany(userId,data);

            navigate('/companies');

        } catch (error) {
            setFormError(error.response.data.message)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(createCompany)}>
                <div className="container_createCompany">
                    <h1>New Company</h1>
                    <hr/>

                    <label><b>Name</b></label>
                    <input type="text" placeholder="Enter Email" {...register('name')} required/>

                    <label><b>Address</b></label>
                    <input type="text" placeholder="Enter Password" {...register('address')} required />

                    <label><b>Service Of Activity</b></label>
                    <input type="text" placeholder="Enter Phone" {...register('serviceOfActivity')} required/>

                    <label><b>Last name</b></label>
                    <input type="text" placeholder="Enter Last name" {...register('lastName')} required />

                    <label><b>Number Of Employees</b></label>
                    <input type="number" placeholder="Enter First name" {...register('numberOfEmployees')} required />

                    <label><b>Description</b></label>
                    <input type="text" placeholder="Enter Nick name" {...register('description')} required />


                    <label><b>Type</b></label>
                    <input type="text" placeholder="Enter Position" {...register('type')} required />

                    <hr/>

                    <button type="submit" className="createbtn">Create Company</button>
                    {formError && formError.map(err =><li key={new Date().getDate()}>{err}</li>)}
                </div>
            </form>
        </>
    );
};

export default CreateCompany;