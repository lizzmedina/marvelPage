import {
    Box,
    Typography,
    TextField,
    Button,
    FormHelperText,
    Grid,
} from "@mui/material";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { IComic } from "interface/comics";
import { useRouter } from "next/router";
import { useForm, Controller, useFormContext } from "react-hook-form";

interface PaymentDataFormProps {
    initialValues: CheckoutInput["card"];
    onPreviousStep?: () => void;
};

const PaymentDataForm: React.FC<PaymentDataFormProps> = ({
            initialValues,
            onPreviousStep,
        }) => {

        const { control, handleSubmit, formState:{ errors, isValid } } = useForm({
            defaultValues: initialValues,            
        });
        const route = useRouter()
        

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
                <Typography variant="h4" align="center">
                    Buy now
                </Typography>
                <form >
                    <Controller
                            name="number"
                            control={control}
                            defaultValue=""
                            rules={{ required: true, maxLength: 20, minLength: 6}}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Numero de tarjeta"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}                              
                                />
                            )}
                    />
                    {errors.number && (
                            // <FormHelperText error>{errors.number.message}</FormHelperText>
                            <FormHelperText error  sx={{mb:2}}>Campo obligatorio.</FormHelperText>
                        )}
                    <Controller
                        name="nameOnCard"
                        control={control}
                        rules={{ required: true, maxLength: 20, minLength: 6 }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nombre igual que en la tarjeta"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                    {errors.nameOnCard && (
                        // <FormHelperText error sx={{mb:2}}>{errors.nameOnCard.message}</FormHelperText>
                        <FormHelperText error  sx={{mb:2}}>Campo obligatorio. Debe ser el mismo nombre de la tarjeta</FormHelperText>
                    )}
                    <Controller
                        name="expDate"
                        control={control}
                        rules={{
                            required: true,
                            pattern: /^((0[1-9])|(1[0-2]))\/((2[2-9])|([3-9][0-9]))$/,
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="fecha de expiración"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                    {errors.expDate && (
                        // <FormHelperText error sx={{mb:2}}>{errors.expDate.message}</FormHelperText>
                        <FormHelperText error  sx={{mb:2}}>Campo obligatorio. Fecha valida: dd/yy - ejemplo: 03/30</FormHelperText>
                    )}

                    <Controller
                        name="cvc"
                        control={control}
                        rules={{
                            required: true,
                            maxLength: 3, minLength: 3
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="codigo de seguridad"
                                variant="outlined"
                                type='password'
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                    {errors.cvc && (
                        // <FormHelperText error sx={{mb:2}}>{errors.cvc.message}</FormHelperText>
                        <FormHelperText error  sx={{mb:2}}>Campo obligatorio. Ingrese los 3 números de seguridad del reverso de su tarjeta</FormHelperText>
                    )}
                </form>
                <Box sx={{mt:3,  display:'flex', flexDirection:'row' , justifyContent:'space-between'}}>
                        <Box>
                            <Button onClick={onPreviousStep} variant="outlined" sx={{ mr: 2 }}>
                                Volver
                            </Button>
                        </Box>
                        <Box>
                            <Button
                            type="submit"
                            variant="contained"
                            color="secondary"  
                        >
                            Comprar
                        </Button>
                        </Box>
                    
                    </Box>
            </Grid>
        </Grid>       
    );
};
export default PaymentDataForm;
