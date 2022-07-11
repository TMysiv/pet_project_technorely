import React from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Dialog, DialogTitle, DialogContent, TextField, DialogActions
} from "@mui/material";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router";

import {companyService} from "../../services/company.service";
import {deleteCompany, updateCompanyById} from "../../store/company.slice";

const CompanyDetail = () => {

    const [open, setOpen] = useState(false);

    const [formError, setFormError] = useState([]);

    const {reset, register, handleSubmit, formState: {errors}} = useForm();

    const token = localStorage.getItem('token');
    const {userId} = jwt_decode(token);

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const {state} = useLocation();
    const {id} = state;

    const removeCompany = async (companyId) => {
        try {
            await companyService.deleteCompany(userId, companyId);
            dispatch(deleteCompany({companyId}))
            navigate('/companies')

        } catch (e) {
            console.log(e)
        }
    }

    const updateCompany =  (data) =>{
        try {
            setOpen(false);
            dispatch(updateCompanyById({id,data}))
            reset()
            navigate('/companies')
        }catch (error) {
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
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow
                            key={state.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {state.name}
                            </TableCell>
                            <TableCell align="center">{state.address}</TableCell>
                            <TableCell align="center">{state.serviceOfActivity}</TableCell>
                            <TableCell align="center">{state.numberOfEmployees}</TableCell>
                            <TableCell align="center">{state.description}</TableCell>
                            <TableCell align="center">{state.type}</TableCell>
                        </TableRow>
                        <Box display="flex" margin={2}>
                            <Box marginRight={2}>
                                <Button variant="contained" color="success" onClick={handleOpen}>Update</Button>
                            </Box>
                            <Box>
                                <Button variant="contained" color="error" onClick={()=> {
                                    removeCompany(state.id)
                                }}>Delete</Button>
                            </Box>
                        </Box>


                    </TableBody>

                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} aria-labelledby="from-dialog-title">
                <DialogTitle id="from-dialog-title">Update Company</DialogTitle>

                <form onSubmit={handleSubmit(updateCompany)}>
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
                        <Button type="submit" color="success">Update</Button>
                    </DialogActions>
                    {formError && formError.map(err =><li key={new Date().getDate()}>{err}</li>)}

                </form>

            </Dialog>

        </>
    );
};

export default CompanyDetail;