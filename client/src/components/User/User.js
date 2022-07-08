import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {
    Typography,
    Button,
    Table,
    Paper,
    TableRow,
    TableCell,
    Box,
    Dialog,
    DialogTitle,
    DialogContent, TextField, DialogActions
} from "@mui/material";
import {useDispatch} from "react-redux";
import {deleteUser, updateUserById} from "../../store/user.slice";
import {useForm} from "react-hook-form";

import {userService} from "../../services/user.service";

const User = ({user}) => {
    const {id} = user;

    const [open, setOpen] = useState(false);
    const [formError,setFormError] = useState([]);

    const {register, handleSubmit,reset, formState: {errors}} = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateUser = async (data) => {

        try {
            setOpen(false);
            dispatch(updateUserById({id,data}))
            reset()

        } catch (error) {
            setFormError(error.response.data.message)
        }
    }

    const removeUser = async () => {
        await userService.deleteUserById(id)
        dispatch(deleteUser())
        navigate('signup')
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }


    return (

        <Paper sx={{p: 1, display: "flex", flexDirection: "column"}}>
            <Table>
                <TableRow>
                    <TableCell>
                        <Typography>
                            <b>First Name:</b> {user.firstName}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>
                            <b>Last Name:</b>{user.lastName}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>
                            <b>Email:</b> {user.email}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>
                            <b>Phone:</b> {user.phone}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>
                            <b>Nick Name:</b> {user.nickName}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>
                            <b>Description:</b> {user.description}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>
                            <b>Position:</b> {user.position}
                        </Typography>
                    </TableCell>
                </TableRow>
            </Table>

            <Box display="flex" justifyContent="center" margin={2}>
                <Box marginRight={2}>
                    <Button variant="contained" color="success" onClick={handleOpen}>Update</Button>
                </Box>
                <Box>
                    <Button variant="contained" color="error" onClick={removeUser}>Delete</Button>
                </Box>
            </Box>

            <Dialog open={open} onClose={handleClose} aria-labelledby="from-dialog-title">
                <DialogTitle id="from-dialog-title">Update User</DialogTitle>

                <form onSubmit={handleSubmit(updateUser)}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="firstName"
                            fullWidth
                            {...register('firstName', {required: "Required field"})}
                            error={!!errors?.firstName}
                            helperText={errors?.firstName ? errors.firstName.message : null}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="lastName"
                            fullWidth
                            {...register('lastName', {required: "Required field"})}
                            error={!!errors?.lastName}
                            helperText={errors?.lastName ? errors.lastName.message : null}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="nickName"
                            fullWidth
                            {...register('nickName', {required: "Required field"})}
                            error={!!errors?.nickName}
                            helperText={errors?.nickName ? errors.nickName.message : null}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="description"
                            fullWidth
                            {...register('description', {required: "Required field"})}
                            error={!!errors?.description}
                            helperText={errors?.description ? errors.description.message : null}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="position"
                            fullWidth
                            {...register('position', {required: "Required field"})}
                            error={!!errors?.position}
                            helperText={errors?.position ? errors.position.message : null}
                        />

                    </DialogContent>


                    <DialogActions>
                        <Button onClick={handleClose} color="error">Cansel</Button>
                        <Button type="submit" color="success">Update</Button>
                    </DialogActions>

                    {formError && formError.map(err =><li key={new Date().getDate()}>{err}</li>)}
                </form>

            </Dialog>
        </Paper>

    );
};

export default User;