import React, {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router";

import {companyService} from "../../services/company.service";
import css from './style.css'

const Companies = () => {

    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const {userId} = jwt_decode(token);

    useEffect(() => {
        companyService.getAll(userId).then(value => setCompanies(value))
    }, [setCompanies])


    const renderTableData = () => {
        return companies.map((company) => {
            const {id, name, address,serviceOfActivity, numberOfEmployees, type} = company;
            return (
                <tr key={id}>
                    <td>{id}</td>

                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{serviceOfActivity}</td>

                    <td>{numberOfEmployees}</td>

                    <td>{type}</td>
                </tr>
            )
        })
    }

    const renderTableHeader = () => {
        const header = ['id','name', 'address','service Of Activity', 'number Of Employees', 'type'];
        return header.map(key => {
            return <th key={new Date().getDate()}>{key.toUpperCase()}</th>
        })
    }

    const crateCompany = () =>{
        navigate('/createCompany');
    }



    return (
        <div className={'table'}>

            <h2 id='title'>Your companies</h2>
            <table id='companies'>
                <tbody>
                <tr>{renderTableHeader()}</tr>
                {renderTableData()}
                </tbody>
            </table>
            <button onClick={crateCompany} type="submit" className="createCompany">Create Company</button>


        </div>
    );
};

export default Companies;