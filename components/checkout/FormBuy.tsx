import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PersonalDataForm from "./personalData/PersonalDataForm";
import AddressDataForm from "./addressData/AddressDataForm";
import PaymentDataForm from "./paymentData/PaymentDataForm";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";

const steps = ["Personal Data", "Address Data", "Payment Data"];

const FormBuy = () => {

    const [activeStep, setActiveStep] = useState(0);
    const route = useRouter();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleBackCard = () => {
        route.back();
    }

    return (
        <Grid item xs={6} md={6} sx={{ justifyContent: "center" }}>
            <Paper
                elevation={4}
                sx={{
                p: 10,
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                alignContent: "center",
                gap: 3,
                minWidth: 500,
                maxWidth: "800",
                m: 5,
                }}
            >
                <Box>
                <Button
                    sx={{
                    fontWeight: "bold",
                    color: "white",
                    border: "1px solid",
                    }}
                    onClick={activeStep === 0 ? handleBackCard:  handleBack}
                    variant="contained"
                >
                    Atrás
                </Button>
                </Box>
                    <Typography sx={{ fontWeight: "bold", fontSize: 40 }}>
                        Payment process
                    </Typography>
                    <Box sx={{ width: "80%", m: 2 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ m: 2, justifyContent: "center" }}>
                        {activeStep === 0 && <PersonalDataForm onNextStep={handleNext} />}
                        {activeStep === 1 && (
                        <AddressDataForm
                            onNextStep={handleNext}
                            onPreviousStep={handleBack}
                        />
                        )}
                        {activeStep === 2 && (
                        <PaymentDataForm onPreviousStep={handleBack} />
                        )}
                    </Box>
                </Box>
            </Paper>
        </Grid>
    );
};

export default FormBuy;
