import { Message } from "@mui/icons-material";
import { Box, TextField, Button, FormHelperText, Grid } from "@mui/material";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { Controller, useFormContext, useFormState } from "react-hook-form";

interface PersonalDataFormProps {
    handleNext: () => void;
};

const PersonalDataForm = ({handleNext}: PersonalDataFormProps) => {

    const { control, handleSubmit} =useFormContext();
    
    const { errors } = useFormState<CheckoutInput>();
                
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
                <form onSubmit={handleSubmit(handleNext)}>
                    
                        <Controller
                        name="customer.name"
                        control={control}
                        defaultValue=''       
                        rules={{ 
                            required: { value: true, message: 'Este campo es obligatorio' },
                            maxLength: { value: 20, message: 'El valor ingresado es demasiado largo' },
                            minLength: { value: 3, message: 'El valor ingresado es demasiado corto' }
                        }}
                        render={({ field }) => (
                        <TextField
                            {...field}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}                           
                        />
                        )}    
                    />    
                    {errors.customer?.name && (
                        <FormHelperText error sx={{mb:2}}>{errors.customer?.name .message}</FormHelperText>
                    )}              

                    <Controller
                        name="customer.lastname"
                        control={control}
                        defaultValue=""
                        rules={{ 
                            required: { value: true, message: 'Este campo es obligatorio' },
                            maxLength: { value: 20, message: 'El valor ingresado es demasiado largo' },
                            minLength: { value: 3, message: 'El valor ingresado es demasiado corto' }
                        }}
                        render={({ field }) => (
                        <TextField
                            {...field}
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        )}
                    />
                    {errors.customer?.lastname && (
                        <FormHelperText error sx={{mb:2}}>{errors.customer.lastname?.message}</FormHelperText>
                    )}

                    <Controller
                        name="customer.email"
                        control={control}
                        defaultValue=''
                        rules={{ 
                            required: { value: true, message: 'Este campo es obligatorio' },
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'El formato del campo no es válido' }
                        }}
                        render={({ field }) => (
                        <TextField
                            {...field}
                            type="text"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        )}
                    />
                    {errors.customer?.email && (
                        <FormHelperText error sx={{mb:2}}> {errors.customer.email.message} </FormHelperText>
                    )}            

                    <Box sx={{ mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                        >
                            Siguiente
                        </Button>
                    </Box>        
                </form>
            </Grid>
        </Grid>
    );
};

export default PersonalDataForm;