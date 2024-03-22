import {  Container, Typography } from "@mui/material";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

const ErrorPage = () => {
    return (
        <LayoutGeneral title="Error" description={"mensaje de error"} >
            <Container style={{ textAlign: "center", padding: "50px" }}>
                <Typography component='h1' variant="h2" color='primary'>Error</Typography>
                <Typography component='text' variant="body1" color='secondary'>Lo sentimos, ocurrió un error al cargar la página.</Typography>
                <Typography component='text' variant="body2" color='secondary'>Por favor, inténtalo de nuevo más tarde.</Typography>
            </Container>
        </LayoutGeneral>
    );
};

export default ErrorPage;