import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

import {authService} from "../../services/auth.service";
import css from './style.css';

const Login = () => {

    const [formError, setFormError] = useState([]);
    const {register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate()

    const login = async (data) => {

        try {
            const token = await authService.login(data);

            localStorage.setItem('token', token.toString());

            navigate('/')

        } catch (error) {
            setFormError(error.response.data.message);
        }
    }

    return (

        <Container maxWidth={"xs"} sx={{
            mt:4,
        }} >
            <h1 align="center">Login</h1>
            <form onSubmit={handleSubmit(login)}>

                <Box mb={2} mt={2}>
                    <TextField
                        variant="outlined"
                        label="email"
                        fullWidth
                        autoComplete="email"
                        autoFocus
                        {...register('email',{required:"Required field", pattern:{
                            value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message:'email must be email'
                            }})}
                        error={!!errors?.email}
                        helperText={errors?.email ? errors.email.message : null}
                    />
                </Box>

                <Box mb={2} mt={2}>
                    <TextField
                        variant="outlined"
                        label="password"
                        fullWidth
                        autoComplete="password"
                        autoFocus
                        {...register('password',{required:"Required field",
                        minLength:4,maxLength:10})}
                        error={!!errors?.password}
                        helperText={errors?.password ? errors.password.message : null}

                    />
                </Box>

                <Button type="submit" variant="contained" color="success" fullWidth>Log In</Button>
            </form>
            {formError && formError.map(err => <li key={new Date().getDate()}>{err}</li>)}
            <Box mt={2} textAlign="center">
                <Typography>
                    You don't have an account yet? <Link to={'/signup'}>Sign Up</Link>
                </Typography>
            </Box>
        </Container>


    );
};

export default Login;