import { Box,   TextField, Button, FormHelperText, Grid } from "@mui/material";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import {  Controller, useFormContext, useFormState} from "react-hook-form";

interface AddressDataFormProps {
    handleNext: () => void;
    handleBack: () => void;
};

const AddressDataForm: React.FC<AddressDataFormProps> = ({  handleNext, handleBack }) => {

    const { control, handleSubmit} = useFormContext();
    const { errors } = useFormState<CheckoutInput>();


    return(
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
                    <form onSubmit={handleSubmit(handleNext)}>
                        <Controller
                            name="customer.address.address1"
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
                                    label="Dirección"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2,  mt: 2 }}
                                />
                            )}
                        />
                        { errors.customer?.address?.address1 &&  
                            <FormHelperText error  sx={{mb:2}}>{errors.customer.address.address1.message} </FormHelperText>
                        }

                        <Controller
                            name="customer.address.address2"
                            control={control}
                            defaultValue=""
                            rules={{ 
                                required: { value: false, message: 'Este campo es obligatorio' },
                                maxLength: { value: 20, message: 'El valor ingresado es demasiado largo' },
                                minLength: { value: 3, message: 'El valor ingresado es demasiado corto' }
                            }}
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
                        { errors.customer?.address?.address2 && 
                            <FormHelperText error  sx={{mb:2}}> {errors.customer.address.address2.message} </FormHelperText>
                        }   

                        <Controller
                            name="customer.address.city"
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
                                    label="Ciudad"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            )}
                        />
                        { errors.customer?.address?.city && 
                            <FormHelperText error  sx={{mb:2}}> {errors.customer.address.city.message} </FormHelperText>
                        }       

                        <Controller
                            name="customer.address.state"
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
                                    label="Estado / provincia"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            )}
                        />      
                        { errors.customer?.address?.state &&  
                            <FormHelperText error   sx={{mb:2}}> {errors.customer.address.state.message} </FormHelperText>
                        }  

                        <Controller
                            name="customer.address.zipCode"
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
                                    label="Código postal"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                            )}
                        />
                        { errors.customer?.address?.zipCode &&  
                            <FormHelperText error>{errors.customer.address.zipCode.message} </FormHelperText>                            
                        } 
                        <Box sx={{mt:1,  display:'flex', flexDirection:'column' , justifyContent:'space-between'}}>
                            <Box >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={handleBack}
                                    fullWidth
                                    sx={{ mb: 2,  color: "white", border: "1px solid" }}
                                >
                                    Volver
                                </Button>
                            </Box>            
                                <Box >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                >
                                    Siguiente
                                </Button>
                            </Box>           
                        </Box>
                                        
                    </form>
            </Grid>
        </Grid>
    );
};
export default AddressDataForm;