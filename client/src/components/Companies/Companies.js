import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Paper,
    Button,
    Box,
    DialogTitle, DialogContent, TextField, DialogActions, Dialog
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

import {createCompany, getCompaniesById} from "../../store/company.slice";

import css from './style.css'

const Companies = () => {

    const [open, setOpen] = useState(false);

    const [formError, setFormError] = useState([]);

    const {reset, register, handleSubmit, formState: {errors}} = useForm();

    const token = localStorage.getItem('token');
    const {userId} = jwt_decode(token);

    const {companies} = useSelector(state => state['companyReducer']);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCompaniesById({userId}))
    }, []);


    const newCompany = (data) => {
        try {
            setOpen(false)
            dispatch(createCompany({userId, data}))
            reset()
        } catch (error) {
            setFormError(error.response.data.message)
        }
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies && companies.map((company) => (
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
                                <Box><Button color="success"><Link
                                    to={`${company.id}`.toString()} state={company}>Details</Link></Button></Box>
                            </TableRow>

                        ))}
                        <Box margin={2}>
                            <Button variant="contained" onClick={handleOpen}>Create</Button>
                        </Box>
                    </TableBody>

                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} aria-labelledby="from-dialog-title">
                <DialogTitle id="from-dialog-title">Create Company</DialogTitle>

                <form onSubmit={handleSubmit(newCompany)}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="name"
                            fullWidth
                            size="small"
                            {...register('name', {required: "Required field"})}
                            error={!!errors?.name}
                            helperText={errors?.name ? errors.name.message : null}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="address"
                            fullWidth
                            size="small"

                            {...register('address', {required: "Required field"})}
                            error={!!errors?.address}
                            helperText={errors?.address ? errors.address.message : null}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="serviceOfActivity"
                            fullWidth
                            size="small"

                            {...register('serviceOfActivity', {required: "Required field"})}
                            error={!!errors?.serviceOfActivity}
                            helperText={errors?.serviceOfActivity ? errors.serviceOfActivity.message : null}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="numberOfEmployees"
                            fullWidth
                            size="small"

                            {...register('numberOfEmployees', {required: "Required field"})}
                            error={!!errors?.numberOfEmployees}
                            helperText={errors?.numberOfEmployees ? errors.numberOfEmployees.message : null}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="description"
                            fullWidth
                            size="small"
                            {...register('description', {required: "Required field"})}
                            error={!!errors?.description}
                            helperText={errors?.description ? errors.description.message : null}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            label="type"
                            fullWidth
                            size="small"
                            {...register('type', {required: "Required field"})}
                            error={!!errors?.type}
                            helperText={errors?.type ? errors.type.message : null}
                        />

                    </DialogContent>


                    <DialogActions>
                        <Button onClick={handleClose} color="error">Cansel</Button>
                        <Button type="submit" color="success">Create</Button>
                    </DialogActions>
                    {formError && formError.map(err => <li key={new Date().getDate()}>{err}</li>)}

                </form>

            </Dialog>

        </>
    );
};

export default Companies;