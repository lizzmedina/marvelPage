import { Grid, ThemeProvider } from "@mui/material";
import FormPay from "dh-marvel/components/checkout/FormPay";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { theme } from "dh-marvel/styles/material-theme";
import { NextPage } from "next";

const CheckoutPage: NextPage = () => {

    return(
        <ThemeProvider theme={theme}>
            <LayoutCheckout> 
                <Grid container sx={{justifyContent:'center', alignContent:'center'}}>
                    <FormPay defaultValues={{
                        customer: {
                            name: "",
                            lastname: "",
                            email: "",
                            address: {
                                address1: "",
                                address2: null,
                                city: "",
                                state: "",
                                zipCode: ""
                            }
                        },
                        card: {
                            number: "",
                            cvc: "",
                            expDate: "",
                            nameOnCard: ""
                        },
                        order: {
                            name: "",
                            image: "",
                            price: 0
                        }
                    }} />
                </Grid>
            </LayoutCheckout>    
        </ThemeProvider>
    );
};

export default CheckoutPage;
