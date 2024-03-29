import {  Container, Typography } from "@mui/material";

const ErrorPage = () => {
    return (
            <Container style={{ textAlign: "center", padding: "50px" }}>
                <Typography component='h1' variant="h2" color='primary'>Error</Typography>
                <Typography component='text' variant="body1" color='secondary'>Lo sentimos, ocurrió un error al cargar la página.</Typography>
                <Typography component='text' variant="body2" color='secondary'>Por favor, inténtalo de nuevo más tarde.</Typography>
            </Container>
    );
};

export default ErrorPage;