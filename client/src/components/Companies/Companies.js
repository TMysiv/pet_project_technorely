import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import jwt_decode from 'jwt-decode';

import css from './style.css'
import {Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper,Button,Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCompaniesById} from "../../store/company.slice";

const Companies = () => {

    const token = localStorage.getItem('token');
    const {userId} = jwt_decode(token);

    const {companies} = useSelector(state => state['companyReducer']);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getCompaniesById({userId}))
    },[])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Service Of Activity</TableCell>
                            <TableCell align="right">Number Of Employees</TableCell>
                            <TableCell align="right">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow
                                key={company.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {company && company.name}
                                </TableCell>
                                <TableCell align="right">{company.address}</TableCell>
                                <TableCell align="right">{company.serviceOfActivity}</TableCell>
                                <TableCell align="right">{company.numberOfEmployees}</TableCell>
                                <TableCell align="right">{company.description}</TableCell>
                                <Box><Button color="success">Update</Button></Box>
                                <Box><Button color="error" >Delete</Button></Box>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};

export default Companies;