import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { useForm, Controller } from 'react-hook-form';
import { Box, Typography, TextField, Button, FormHelperText, Grid } from '@mui/material';
import 'react-credit-cards-2/dist/es/styles-compiled.css'

interface PaymentFormData {
    cardNumber: string;
    userName: string;
    expirationDate: string;
    securityCode: string;
}

interface FormProps {
    onPreviousStep?: () => void;
}

const FormPayCard = ({ onPreviousStep }: FormProps) => {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<PaymentFormData>();
    const [focus, setFocus] = useState<'number' | 'name' | 'expiry' | 'cvc' | undefined>();
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
      });
    const handleFocus = (name: 'number' | 'name' | 'expiry' | 'cvc') => {
        setFocus(name);
    };
    const handleInputChange = (evt: { target: { name: any; value: any; }; }) => {
        const { name, value } = evt.target;
        
        setState((prev) => ({ ...prev, [name]: value }));
    }

    const onSubmit = (data: PaymentFormData) => {
        console.log("Form data:", data);
        // Aquí podrías enviar los datos a la API o realizar otras acciones necesarias
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
                <Typography variant="h4" align="center">
                    Comprar ahora
                </Typography>
                <Cards
                    number={control._defaultValues.cardNumber || ''}
                    name={control._defaultValues.userName || ''}
                    expiry={control._defaultValues.expirationDate || ''}
                    cvc={control._defaultValues.securityCode || ''}
                    focused={focus}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="cardNumber"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="text"
                                label="Número de tarjeta"
                                variant="outlined"
                                fullWidth
                                onFocus={() => handleFocus('number')}
                                onChange={(e) => handleInputChange(e)}
                            />
                        )}
                    />
                    {errors.cardNumber && (
                        <FormHelperText error>Este campo es obligatorio</FormHelperText>
                    )}
                    <Controller
                        name="userName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="text"
                                label="Nombre en la tarjeta"
                                variant="outlined"
                                fullWidth
                                onFocus={() => handleFocus('name')}
                            />
                        )}
                    />
                    {errors.userName && (
                        <FormHelperText error>Este campo es obligatorio</FormHelperText>
                    )}
                    <Controller
                        name="expirationDate"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="text"
                                label="Fecha de expiración (MM/YY)"
                                variant="outlined"
                                fullWidth
                                onFocus={() => handleFocus('expiry')}
                            />
                        )}
                    />
                    {errors.expirationDate && (
                        <FormHelperText error>Este campo es obligatorio</FormHelperText>
                    )}
                    <Controller
                        name="securityCode"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="password"
                                label="Código de seguridad (CVC)"
                                variant="outlined"
                                fullWidth
                                onFocus={() => handleFocus('cvc')}
                            />
                        )}
                    />
                    {errors.securityCode && (
                        <FormHelperText error>Este campo es obligatorio</FormHelperText>
                    )}
                    <Box mt={3}>
                        <Button
                            type="button"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={onPreviousStep}
                        >
                            Atrás
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            disabled={!isValid}
                        >
                            Comprar
                        </Button>
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
};

export default FormPayCard;
