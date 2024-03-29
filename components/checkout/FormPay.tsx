import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import PersonalDataForm from "./personalData/PersonalDataForm";
import AddressDataForm from "./addressData/AddressDataForm";
import PaymentDataForm from "./paymentData/PaymentDataForm";
import { useForm, FormProvider } from "react-hook-form";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { useRouter } from "next/router";
import { IComic } from "interface/comics";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import CheckoutCard from "./CheckoutCard";
import * as yup from "yup";
const steps = ["Personal Data", "Address Data", "Payment Data"];

interface FormPayProps {
    defaultValues: CheckoutInput;
};

const FormPay: React.FC<FormPayProps> = ({ defaultValues }) => {

    const route = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm<CheckoutInput>({ defaultValues });
    const comicId = route.query.id as string;
    const [comicData, setComicData] = useState<IComic | null>(null);
    const [query, setQuery] = useState(comicId);

    useEffect(() => {
        const getInfo = async () => {
        if (query) {
            const id = parseInt(query);
            getComic(id).then((data: IComic) => {
            setComicData(data);
            });
        }
        };
        getInfo();
    }, [query]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleBackCard = () => {
        route.back();
    };

    const handleFormSubmit  = async (data: CheckoutInput) => {
        
        const { card, ...restData } = data;
        const filteredData: CheckoutInput = {
        ...restData,
        card: {
            ...card,
            cvc: "",
        },
        order: {
            name: comicData?.title || "",
            image: comicData?.thumbnail.path.concat( ".",  comicData?.thumbnail.extension ) || "",
            price: comicData?.price || 0,
        },
        };
        route.push(
        {
            pathname: "/confirmacion-compra",
            query: {
            data: JSON.stringify({
                name: filteredData.customer.name,
                lastname: filteredData.customer.lastname,
                email: filteredData.customer.email,
                address: {
                address1: filteredData.customer.address.address1,
                address2: filteredData.customer.address.address2,
                city: filteredData.customer.address.city,
                state: filteredData.customer.address.state,
                zipCode: filteredData.customer.address.zipCode,
                },
                card: {
                number: filteredData.card.number,
                cvc: filteredData.card.cvc,
                expDate: filteredData.card.expDate,
                nameOnCard: filteredData.card.nameOnCard,
                },
                order: {
                name: filteredData.order.name,
                image: filteredData.order.image,
                price: filteredData.order.price,
                },
            }),
            },
        },
        "/confirmacion-compra"
        );
        fetch('/api/checkout.route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            route.push(`/confirmacion-compra`);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        <Grid
            item
            xs={6}
            md={6}
            sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}
        >
        <Paper
            elevation={4}
            sx={{
                p: 10,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "center",
                gap: 3,
                m: 5,
            }}
        >
            <Box>
            <Button
                sx={{ fontWeight: "bold", color: "white", border: "1px solid" }}
                onClick={handleBackCard}
                variant="contained"
            >
                Atrás
            </Button>
            </Box>
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
            >
            <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
                Payment process
            </Typography>
            <Stack
                direction={{ sm: "column", md: "row-reverse" }}
                spacing={{ xs: 5, sm: 8, md: 8, xl: 10 }}
                alignItems={"center"}
            >
                {comicData && <CheckoutCard comic={comicData} />}
            </Stack>
            </Box>
            <Box sx={{ width: "80%", m: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <Box sx={{ m: 2, justifyContent: "center" }}>
                <FormProvider {...methods}>
                <FormContent
                    activeStep={activeStep}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleFormSubmit={handleFormSubmit}
                />
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

const FormContent: React.FC<FormContentProps> = ({
    activeStep,
    handleNext,
    handleBack,
    handleFormSubmit,
}) => {
    switch (activeStep) {
        case 0:
        return <PersonalDataForm handleNext={handleNext} />;
        case 1:
        return (
            <AddressDataForm handleBack={handleBack} handleNext={handleNext} />
        );
        case 2:
        return (
            <PaymentDataForm
            onPreviousStep={handleBack}
            handleFormSubmit={handleFormSubmit}
            />
        );
        default:
        return null;
    }
    };
export default FormPay;
