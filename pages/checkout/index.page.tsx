import { Grid, ThemeProvider } from "@mui/material";
import FormBuy from "dh-marvel/components/checkout/FormBuy";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { theme } from "dh-marvel/styles/material-theme";
import { NextPage } from "next";


const CheckoutPage: NextPage = ({ }) => {

    return(
        <ThemeProvider theme={theme}>
            <LayoutCheckout>     
                    <Grid container sx={{justifyContent:'center', alignContent:'center'}}>
                        <FormBuy />
                    </Grid>
            </LayoutCheckout>    
        </ThemeProvider>
    );
};

export default CheckoutPage;
