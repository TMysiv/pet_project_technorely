import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

import {authService} from "../../services/auth.service";
import css from './style.css';


const Registration = () => {
    const [formError, setFormError] = useState([]);
    const navigate = useNavigate();

    const {register, handleSubmit,formState:{errors}} = useForm();

    const createUser = async (data) => {

        try {
            await authService.registration(data);

            navigate('/login');

        } catch (error) {
            setFormError(error.response.data.message)
        }
    }

    return (
        <Container maxWidth={"xs"} sx={{
            mt:4,
        }} >
            <h1 align="center">Registration</h1>
            <p>Please fill in this form to create an account</p>
            <form onSubmit={handleSubmit(createUser)}>

                <Box mt={2}>
                    <TextField
                        variant="outlined"
                        label="email"
                        fullWidth
                        autoComplete="email"
                        autoFocus
                        size="small"
                        {...register('email',{required:"Required field", pattern:{
                                value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message:'email must be email'
                            }})}
                        error={!!errors?.email}
                        helperText={errors?.email ? errors.email.message : null}
                    />
                </Box>

                <Box mt={2}>
                    <TextField
                        variant="outlined"
                        label="password"
                        fullWidth
                        autoComplete="password"
                        autoFocus
                        size="small"
                        {...register('password',{required:"Required field",
                            minLength:4,maxLength:10})}
                        error={!!errors?.password}
                        helperText={errors?.password ? errors.password.message : null}

                    />
                </Box>

                <Box mt={2}>
                    <TextField
                        variant="outlined"
                        label="phone"
                        fullWidth
                        autoComplete="phone"
                        autoFocus
                        size="small"
                        {...register('phone',{required:"Required field"})}
                        error={!!errors?.phone}
                        helperText={errors?.phone ? errors.phone.message : null}
                    />
                </Box>

                <Box mt={2}>
                    <TextField
                        variant="outlined"
                        label="firstName"
                        fullWidth
                        autoComplete="firstName"
                        autoFocus
                        size="small"
                        {...register('firstName',{required:"Required field"})}
                        error={!!errors?.firstName}
                        helperText={errors?.firstName ? errors.firstName.message : null}
                    />
                </Box>

                <Box mt={2}>
                    <TextField
                        variant="outlined"
                        label="lastName"
                        fullWidth
                        autoComplete="lastName"
                        autoFocus
                        size="small"
                        {...register('lastName',{required:"Required field"})}
                        error={!!errors?.lastName}
                        helperText={errors?.lastName ? errors.lastName.message : null}
                    />
                </Box>

                <Box mt={2}>
                    <TextField
                        variant="outlined"
                        label="nickName"
                        fullWidth
                        autoComplete="nickName"
                        autoFocus
                        size="small"
                        {...register('nickName',{required:"Required field"})}
                        error={!!errors?.nickName}
                        helperText={errors?.nickName ? errors.nickName.message : null}
                    />
                </Box>

                <Box mt={2}>
                    <TextField
                        variant="outlined"
                        label="description"
                        fullWidth
                        autoComplete="description"
                        autoFocus
                        size="small"
                        {...register('description',{required:"Required field"})}
                        error={!!errors?.description}
                        helperText={errors?.description ? errors.description.message : null}
                    />
                </Box>

                <Box  mt={2} mb={2}>
                    <TextField
                        variant="outlined"
                        label="position"
                        fullWidth
                        autoComplete="position"
                        autoFocus
                        size="small"
                        {...register('position',{required:"Required field"})}
                        error={!!errors?.position}
                        helperText={errors?.position ? errors.position.message : null}
                    />
                </Box>

                <Button type="submit" variant="contained" color="success" fullWidth>Registration</Button>
            </form>
            {formError && formError.map(err => <li key={new Date().getDate()}>{err}</li>)}
            <Box mt={2} textAlign="center">
                <Typography>
                    Already have account? <Link to={'/login'}>Sign In</Link>
                </Typography>
            </Box>
        </Container>

    );
};

export default Registration;