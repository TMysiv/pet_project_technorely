import React from 'react';
import {useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {
    Box,
    Button, InputLabel,
    MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    FormControl
} from "@mui/material";

import {getAllUsers, removeUser} from "../../store/admin.slice";
import {adminService} from "../../services/admin.service";

const UsersAll = () => {

    const {users} = useSelector(state => state['adminReducer']);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers())
    },[])


    const deleteUser = async (userId) => {
        try {
            await adminService.deleteUser(userId)
            dispatch(removeUser({userId}))
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
                            <TableCell>First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Nick Name</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Position</TableCell>
                            <TableCell align="center">Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {user && user.firstName}
                                </TableCell>
                                <TableCell align="center">{user.lastName}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.phone}</TableCell>
                                <TableCell align="center">{user.nickName}</TableCell>
                                <TableCell align="center">{user.description}</TableCell>
                                <TableCell align="center">{user.position}</TableCell>
                                <TableCell align="center">{user.role}</TableCell>
                                <Box display="flex">

                                    <Box><Button color="success" >Update</Button></Box>
                                    <Box><Button color="error" onClick={()=> deleteUser(user.id)}>Delete</Button></Box>
                                </Box>

                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};

export default UsersAll;