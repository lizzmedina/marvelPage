import { Grid, ThemeProvider } from "@mui/material";
import FormPay from "dh-marvel/components/checkout/FormPay";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { theme } from "dh-marvel/styles/material-theme";
import { IComic } from "interface/comics";
import { NextPage } from "next";

const CheckoutPage: NextPage<{ comic: IComic }> = ({ comic }) => {

    return(
        <ThemeProvider theme={theme}>
            <LayoutCheckout> 
                <Grid container sx={{justifyContent:'center', alignContent:'center'}}>
                    <FormPay />
                </Grid>
            </LayoutCheckout>    
        </ThemeProvider>
    );
};

export default CheckoutPage;
