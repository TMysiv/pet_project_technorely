import React,{useEffect} from 'react';
import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

import {getAllCompanies, removeCompany} from "../../store/admin.slice";
import {adminService} from "../../services/admin.service";

const CompaniesAll = () => {

    const {companies} = useSelector(state => state['adminReducer']);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCompanies())
    },[])

    const deleteCompany = async (companyId) => {
        try {
            await adminService.deleteCompany(companyId)
            dispatch(removeCompany({companyId}))
        } catch (e) {
            console.log(e)
        }

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
                            <TableCell align="center">Number of Employees</TableCell>
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
                                    {company.name}
                                </TableCell>
                                <TableCell align="center">{company.address}</TableCell>
                                <TableCell align="center">{company.serviceOfActivity}</TableCell>
                                <TableCell align="center">{company.numberOfEmployees}</TableCell>
                                <TableCell align="center">{company.description}</TableCell>
                                <TableCell align="center">{company.type}</TableCell>
                                <Box display="flex">

                                    <Box><Button color="error"  onClick={()=> deleteCompany(company.id)}>Delete</Button></Box>
                                </Box>

                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};

export default CompaniesAll;