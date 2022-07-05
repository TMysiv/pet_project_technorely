import React,{useState} from 'react';
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";

import {companyService} from "../../services/company.service";
import jwt_decode from "jwt-decode";

import css from './style.css'

const CreateCompany = () => {

    const [formError, setFormError] = useState([]);
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm();

    const token = localStorage.getItem('token');
    const {userId} = jwt_decode(token);

    const createCompany = async (data) => {

        try {
            await companyService.createCompany(userId,data);

            navigate('/companies');

        } catch (error) {
            console.log(error)
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
                    <input type="text" placeholder="Enter Name" {...register('name')} required/>

                    <label><b>Address</b></label>
                    <input type="text" placeholder="Enter Address" {...register('address')} required />

                    <label><b>Service Of Activity</b></label>
                    <input type="text" placeholder="Enter Service Of Activity" {...register('serviceOfActivity')} required/>

                    <label><b>Number Of Employees</b></label>
                    <input type="number" placeholder="Enter Number Of Employees" {...register('numberOfEmployees')} required />

                    <label><b>Description</b></label>
                    <input type="text" placeholder="Enter Description" {...register('description')} required />


                    <label><b>Type</b></label>
                    <input type="text" placeholder="Enter Type" {...register('type')} required />

                    <hr/>

                    <button type="submit" className="createbtn">Create Company</button>
                    {formError && formError.map(err =><li key={new Date().getDate()}>{err}</li>)}
                </div>
            </form>
        </>
    );
};

export default CreateCompany;