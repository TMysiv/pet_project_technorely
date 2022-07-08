import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import jwt_decode from 'jwt-decode';
import {Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper, Button, Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

import {getCompaniesById} from "../../store/company.slice";
import {companyService} from "../../services/company.service";
import {deleteCompany} from '../../store/company.slice'

const Companies = () => {

    const token = localStorage.getItem('token');
    const {userId} = jwt_decode(token);

    const {companies} = useSelector(state => state['companyReducer']);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCompaniesById({userId}))
    }, []);

    const removeCompany = async (companyId) => {
        try {
            await companyService.deleteCompany(userId, companyId);
            dispatch(deleteCompany({companyId}))
        } catch (e) {
            console.log(e)
        }

    }

    const createCompany = () =>{
        navigate('/createCompany')
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Service Of Activity</TableCell>
                            <TableCell align="center">Number Of Employees</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Type</TableCell>
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
                                <TableCell align="center">{company.address}</TableCell>
                                <TableCell align="center">{company.serviceOfActivity}</TableCell>
                                <TableCell align="center">{company.numberOfEmployees}</TableCell>
                                <TableCell align="center">{company.description}</TableCell>
                                <TableCell align="center">{company.type}</TableCell>
                                <Box><Button color="success">Update</Button></Box>
                                <Box><Button color="error" onClick={() => {
                                    removeCompany(company.id)
                                }}>Delete</Button></Box>
                            </TableRow>

                        ))}
                        <Box margin={2}>
                            <Button variant="contained" onClick={createCompany}>Create</Button>
                        </Box>
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};

export default Companies;