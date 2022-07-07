import React from 'react';
import {useNavigate} from "react-router";
import {Typography, Button, Table, Paper, TableRow, TableCell, Box} from "@mui/material";
import {useDispatch} from "react-redux";

import {userService} from "../../services/user.service";
import {deleteUser} from "../../store/user.slice";

const User = ({user}) => {
    const {id} = user;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateUser = () => {
        navigate('update')
    }

    const removeUser = async () => {
        await userService.deleteUserById(id)
        dispatch(deleteUser())
        navigate('signup')
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
                    <Button variant="contained" color="success" onClick={updateUser}>Update</Button>
                </Box>
                <Box>
                    <Button variant="contained" color="error" onClick={removeUser}>Delete</Button>
                </Box>
            </Box>
        </Paper>

    );
};

export default User;