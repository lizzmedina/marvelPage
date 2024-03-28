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

    interface DefaultValues {
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
    
    }
    
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
        }
    
    };
    const formsData: CheckoutInput = {       
        customer: {
            name: "",
            lastname: "",
            email: "",
            address: {
                address1: "",
                address2: "" || null,
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
    };
interface PersonalData {
        name: string;
        lastname: string;
        email: string;
    }
    
    interface AddressData {
        address1: string;
        address2?: string | null;
        city: string;
        state: string;
        zipCode: string;
    }
    
    interface CardData {
        number: string;
        cvc: string;
        expDate: string;
        nameOnCard: string;
    }

    const FormPay: React.FC = () => {

    const route = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm<CheckoutInput>();
    const comicId = route.query.id as string;
    const [comicData, setComicData] = useState<IComic | null>(null);
    const [checkoutData, setCheckoutData] = useState<DefaultValues>(defaultValues)

    console.log('id ', comicId);

    const getInfo =async  () =>{
        if (comicId) {
            const id = parseInt(comicId);
            getComic(id).then((data: IComic) => {
                setComicData(data);
            });
        };
    };
    const name = comicData?.title!
    const image = comicData?.thumbnail.path.concat(".", comicData?.thumbnail.extension)!
    const price = comicData?.price!

    const order : typeof defaultValues.order = {
        name,
        image,
        price
    }
    useEffect(() => {
        getInfo()
    }, []);
    
    const formatearInfo = (data: DefaultValues): CheckoutInput => {
        const dataFormat = {
            customer: {
                ...data.customer,
                address: {
                    ...data.address
                },
            },
            card: {
                ...data.card
            },
            order: {
                ...data.order
            },
        }
        return dataFormat;
    }

        const handleNext = () => {
            console.log({activeStep, handleNext: '34'});
            //si activestep === 0 
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };
    
        const handleBack = () => {
            console.log({activeStep});
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };
    
        const handleBackCard = () => {
            route.back();
        };
    
        // const handleFormSubmit = (data: CheckoutInput) => {
        //     // Make request to the validation API with complete data
        //     fetch('/api/checkout.route', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data),
        //     })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         // Handle API response
        //         route.push(`/confirmacion-compra`);
        //     })
        //     .catch(error => {
        //         // Handle errors
        //         console.error('There was an error!', error);
        //     });
        // };
        const onsubmit = ()=> {
            route.push(`/confirmacion-compra`)
        }
        return (
            <Grid item xs={6} md={6} sx={{ justifyContent: "center" }}>
                <Paper elevation={4} sx={{ p: 10, display: "flex", flexDirection: "column", flexWrap: "wrap", alignContent: "center", gap: 3, minWidth: 500, maxWidth: "800", m: 5 }}>
                    <Box>
                        <Button sx={{ fontWeight: "bold", color: "white", border: "1px solid" }} onClick={activeStep === 0 ? handleBackCard : handleBack} variant="contained">
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
                                {activeStep === 0 && <PersonalDataForm initialValues={methods.getValues('customer')} onNextStep={handleNext} />}
                                {activeStep === 1 && <AddressDataForm initialValues={methods.getValues('customer.address')}  />}
                                {activeStep === 2 && <PaymentDataForm  initialValues={methods.getValues('card')} />}
                            </FormProvider>
                        </Box>
                        
                    </Box>
                </Paper>
            </Grid>
        );
    };
    
    export default FormPay;
    
