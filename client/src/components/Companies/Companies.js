import React, {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import {companyService} from "../../services/company.service";

import css from './style.css'

const Companies = () => {

    const [companies, setCompanies] = useState([]);

    const token = localStorage.getItem('token');
    const {userId} = jwt_decode(token);

    useEffect(() => {
        companyService.getAll(userId).then(value => setCompanies(value))
    }, [])

    const renderTableData = () => {
        return companies.map((company) => {
            const {id, name, address, numberOfEmployees, type} = company;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{address}</td>

                    <td>{numberOfEmployees}</td>

                    <td>{type}</td>
                    <button>update</button>
                    <button>delete</button>
                </tr>
            )
        })
    }

    const renderTableHeader = () => {
        const header = ['id', 'name', 'address', 'numberOfEmployees', 'type', 'buttons'];
        return header.map(key => {
            return <th key={new Date().getDate()}>{key.toUpperCase()}</th>
        })
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


        </div>
    );
};

export default Companies;