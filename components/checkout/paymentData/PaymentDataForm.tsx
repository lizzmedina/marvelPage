import {
    Box,
    Typography,
    TextField,
    Button,
    FormHelperText,
    Grid,
} from "@mui/material";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { useRouter } from "next/router";
import { useForm, Controller, useFormContext } from "react-hook-form";
interface PaymentDataFormProps {
    methods: any;
    onPreviousStep: () => void;
    onSendPay : any
};

const PaymentDataForm: React.FC<PaymentDataFormProps> = ({
    methods,
            onPreviousStep,
            onSendPay
        }) => {
          
            const { control, handleSubmit, formState: { errors } } = methods;
            
        const route = useRouter()
        

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
                <Typography variant="h4" align="center">
                    Buy now
                </Typography>
                <form onSubmit={handleSubmit(onSendPay)}>
                    <Controller
                            name="number"
                            control={control}
                            defaultValue=""
                            rules={{ 
                                required: { value: true, message: 'Este campo es obligatorio' },
                                maxLength: { value: 20, message: 'El valor ingresado es demasiado largo' },
                                minLength: { value: 14, message: 'El valor ingresado es demasiado corto' }
                            }}
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
                            <FormHelperText error sx={{mb:2}}>{errors.number.message}</FormHelperText>
                        )}
                    <Controller
                        name="nameOnCard"
                        control={control}
                        rules={{ 
                            required: { value: true, message: 'Este campo es obligatorio' },
                            maxLength: { value: 20, message: 'El valor ingresado es demasiado largo' },
                            minLength: { value: 3, message: 'El valor ingresado es demasiado corto' }
                        }}
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
                        <FormHelperText error sx={{mb:2}}>{errors.nameOnCard.message}</FormHelperText>
                        
                    )}
                    <Controller
                        name="expDate"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Este campo es obligatorio' },
                            pattern: {
                                value: /^((0[1-9])|(1[0-2]))\/((2[2-9])|([3-9][0-9]))$/,
                                message: 'El formato de fecha de expiración no es válido'
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Fecha de expiración (MM/YY)"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                    {errors.expDate && (
                        <FormHelperText error sx={{mb:2}}>{errors.expDate.message}</FormHelperText>
                        
                    )}

                    <Controller
                        name="cvc"
                        control={control}
                        rules={{ 
                            required: { value: true, message: 'Este campo es obligatorio' },
                            maxLength: { value: 3, message: 'El valor ingresado es demasiado largo' },
                            minLength: { value: 3, message: 'El valor ingresado es demasiado corto' }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Código de seguridad (CVC)"
                                variant="outlined"
                                type='password'
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                    {errors.cvc && (
                        <FormHelperText error sx={{mb:2}}>{errors.cvc.message}</FormHelperText>
                        
                    )}
                    <Box sx={{mt:3,  display:'flex', flexDirection:'row' , justifyContent:'space-between'}}>
                        <Box>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={onPreviousStep}
                                >
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
                </form>
                
            </Grid>
        </Grid>       
    );
};
export default PaymentDataForm;
