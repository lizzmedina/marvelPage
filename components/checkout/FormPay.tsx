import React, { useEffect, useState } from "react";
import { Box, Typography, Stepper, Step, StepLabel, Grid, Paper, Button, Stack } from "@mui/material";
import PersonalDataForm from "./personalData/PersonalDataForm";
import AddressDataForm from "./addressData/AddressDataForm";
import PaymentDataForm from "./paymentData/PaymentDataForm";
import { useForm, FormProvider } from "react-hook-form";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { useRouter } from "next/router";
import { IComic } from "interface/comics";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import CheckoutCard from "./CheckoutCard";

    const steps = ["Personal Data", "Address Data", "Payment Data"];

    export interface DefaultValues {        
        customer: {
            name: string;
            lastname: string;
            email: string;
        };
        address: {
            address1: string;
            address2: string;
            city: string;
            state: string;
            zipCode: string;
        };
        card: {
            number: string;
            cvc: string;
            expDate: string;
            nameOnCard: string;
        };
        order: {
            name: string,
            image: string,
            price: number
        }    
    };
    
    const defaultValues: DefaultValues = {
        customer: {
            name: "",
            lastname: "",
            email: "",
        },
        address: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: "",
        },
        card: {
            number: "",
            cvc: "",
            expDate: "",
            nameOnCard: "",
        },
        order: {
            name: "",
            image: "",
            price: 0
        },    
    };

    const FormPay: React.FC = () => {

    const route = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm<CheckoutInput>({defaultValues});
    const comicId = route.query.id as string;
    const [comicData, setComicData] = useState<IComic | null>(null);
    //const [checkoutData, setCheckoutData] = useState<DefaultValues>(defaultValues)
    const [query, setQuery] = useState(comicId);

    useEffect(() => {
        const getInfo = async  () =>{
            if (query) {
                const id = parseInt(query);
                getComic(id).then((data: IComic) => {
                    setComicData(data);
                });
            };
        };
        getInfo();
    }, [query]);       

    const name = comicData?.title!
    const image = comicData?.thumbnail.path.concat(".", comicData?.thumbnail.extension)!
    const price = comicData?.price!

   const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };
    
        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };

        const handleBackCard = () => {
            route.back();
        };

        const handleFormSubmit = (data: CheckoutInput) => {   
            route.push(
                {
                    pathname: "/confirmacion-compra",
                    query: {
                        name: data.name,
                        lastname: data.lastname,
                        email: data.email,
                        image: image,
                        price: price,
                        address : `${data.address1}${data.city}.${data.state}.${data.zipCode}`
                    },
                },
                "/confirmacion-compra"
            );
            // postCheckOut(data);
            return;
            // postCheckOut(data);
            // fetch('/api/checkout.route', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data),
            // })
            // .then(response => {
            //     if (!response.ok) {
            //         throw new Error('Network response was not ok');
            //     }
            //     return response.json();
            // })
            // .then(data => {
            //     route.push(`/confirmacion-compra`);
            // })
            // .catch(error => {
            //     console.error('There was an error!', error);
            // });
        };

        return (
            <Grid item xs={6} md={6} sx={{ justifyContent: "center" }}>
                <Paper elevation={4} sx={{ p: 10, display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent: "center", gap: 3, minWidth: 500, maxWidth: "800", m: 5 }}>
                    <Box>
                        <Button sx={{ fontWeight: "bold", color: "white", border: "1px solid" }} onClick={handleBackCard} variant="contained">
                            Atrás
                        </Button>
                    </Box>
                    <Typography sx={{ fontWeight: "bold", fontSize: 40 }}>Payment process</Typography>
                    <Box sx={{ padding: { xs: "20px", sm: "20px" } }} display={'flex'} justifyContent={'center'}>
                        <Stack
                            direction={{ sm: "column", md: "row-reverse" }}
                            spacing={{ xs: 5, sm: 8, md: 8, xl: 20 }}
                            alignItems={'center'}
                        >
                            {comicData && (
                                <CheckoutCard  comic={comicData} />
                            )}
                        </Stack>
                    </Box>
                    <Box sx={{ width: "80%", m: 2 }}>
                        <Stepper  activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Box sx={{ m: 2, justifyContent: "center" }}>
                            <FormProvider {...methods}>
                                <FormContent activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} handleFormSubmit={handleFormSubmit} />
                            </FormProvider>
                        </Box>                        
                    </Box>
                </Paper>
            </Grid>
        );
    };
    interface FormContentProps {
        activeStep: number;
        handleNext: () => void;
        handleBack: () => void;
        handleFormSubmit: (data: CheckoutInput) => void;
    }
    
    const FormContent: React.FC<FormContentProps> = ({ activeStep, handleNext, handleBack, handleFormSubmit }) => {
        switch (activeStep) {
            case 0:
                return <PersonalDataForm handleNext={handleNext} />;
            case 1:
                return <AddressDataForm handleBack={handleBack} handleNext={handleNext} />;
            case 2:
                return <PaymentDataForm onPreviousStep={handleBack} handleFormSubmit={handleFormSubmit} />;
            default:
                return null;
        }
    };
    export default FormPay;
    
