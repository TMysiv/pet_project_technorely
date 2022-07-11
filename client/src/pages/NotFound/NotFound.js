import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <Container maxWidth={"xs"}>
            <Box display={"flex"} justifyContent={"center"} mt={3}>

                <Typography variant="h3">Page not found</Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} mt={2}>
                <Link to={''} >Main</Link>

            </Box>
        </Container>
    );
};

export default NotFound;