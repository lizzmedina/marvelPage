
import { Box, Paper, Typography, TextField, Button, FormHelperText, Grid } from "@mui/material";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { useForm, Controller} from "react-hook-form"


interface AddressDataFormProps {
    initialValues: CheckoutInput["customer"]["address"];
};

const AddressDataForm: React.FC<AddressDataFormProps> = ({ initialValues }) => {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<CheckoutInput["customer"]["address"]>({ defaultValues: initialValues });


    return(
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
                    <Typography variant='h4' align="center"> Address information </Typography>
                    <form >
                        <Controller
                            name="address1"
                            control={control}
                            rules={{required: true, maxLength: 20, minLength: 3}} 
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Dirección"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2,  mt: 2 }}
                                />
                            )}
                        />
                        { errors.address1 &&  
                            // <FormHelperText error>{errors.address1.message} </FormHelperText>
                            <FormHelperText error sx={{mb:2}}>Este campo es obligatorio. </FormHelperText>
                        }

                        <Controller
                            name="address2"
                            control={control}
                            rules={{required: false, maxLength: 40, minLength: 0}} 
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Detalle de la dirección"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            )}
                        />
                        { errors.address2 && 
                            // <FormHelperText error> {errors.address2.message} </FormHelperText>
                            <FormHelperText error sx={{mb:2}}> Detalles como piso, tipo de vivivienda, etc. </FormHelperText>
                        }   

                        <Controller
                            name="city"
                            control={control}
                            rules={{required: true, maxLength: 20, minLength: 3}} 
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Ciudad"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            )}
                        />
                        { errors.city && 
                            // <FormHelperText error> {errors.city.message} </FormHelperText>
                            <FormHelperText error sx={{mb:2}}>Este campo es obligatorio. </FormHelperText>
                        }       

                        <Controller
                            name="state"
                            control={control}
                            rules={{required: true, maxLength: 20, minLength: 3}} 
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Estado / provincia"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            )}
                        />      
                        { errors.state &&  
                            // <FormHelperText error > {errors.state.message} </FormHelperText>
                            <FormHelperText error sx={{mb:2}}>Este campo es obligatorio. </FormHelperText>
                        }  

                        <Controller
                            name="zipCode"
                            control={control}
                            rules={{required: true, maxLength: 20, minLength: 3}} 
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Código postal"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            )}
                        />
                        { errors.zipCode &&  
                            // <FormHelperText error>{errors.zipCode.message} </FormHelperText>
                            <FormHelperText error sx={{mb:2}}>Este campo es obligatorio. </FormHelperText>
                        }                                     
                    </form>
            </Grid>
        </Grid>
    );
};
export default AddressDataForm;