
import { Box, Paper, Typography, TextField, Button, FormHelperText, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useForm, Controller} from "react-hook-form"

interface IAddressDataFormProps {
    address: string,   
    addressDetails?: string,
    city: string,
    provincia: string,
    postalCode: string
} ;
interface FormProps {
    onNextStep: () => void;
    onPreviousStep?: () => void;
};
const AddressDataForm = ({ onNextStep, onPreviousStep }: FormProps) => {

    const {control, handleSubmit, formState:{errors, isValid}} = useForm<IAddressDataFormProps>();
    const router = useRouter();

    const onContinue = (data:IAddressDataFormProps) => {
        console.log('probando el botón, data: ', data);        
    };

    return(
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
                    <Typography variant='h4' align="center"> Address information </Typography>
                    <form onSubmit={handleSubmit(onContinue)}>
                        <Controller
                            name="address"
                            control={control}
                            rules={{required: true, maxLength: 20, minLength: 3}} 
                            render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
                                <TextField
                                    onChange={onChange} 
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}                            
                                    type="text"
                                    label='address'
                                    variant="outlined"
                                    fullWidth
                                    sx={{mb:2}}
                                />
                            )}
                        />
                        { errors.address &&  <FormHelperText error>Este campo es obligatorio</FormHelperText>}

                        <Controller
                            name="addressDetails"
                            control={control}
                            rules={{required: false, maxLength: 20, minLength: 3}} 
                            render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
                                <TextField
                                    onChange={onChange} 
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}                            
                                    type="text"
                                    label='addressDetail'
                                    variant="outlined"
                                    fullWidth
                                    sx={{mb:2}}
                                />
                            )}
                        />
                        { errors.addressDetails &&  <FormHelperText error>Este campo es obligatorio</FormHelperText>}   

                        <Controller
                            name="city"
                            control={control}
                            rules={{required: true, maxLength: 20, minLength: 3}} 
                            render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
                                <TextField
                                    onChange={onChange} 
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}                            
                                    type="text"
                                    label='city'
                                    variant="outlined"
                                    defaultValue=''
                                    fullWidth
                                    sx={{mb:2}}
                                />
                            )}
                        />
                        { errors.city &&  <FormHelperText error>Este campo es obligatorio</FormHelperText>}       

                        <Controller
                            name="provincia"
                            control={control}
                            rules={{required: true, maxLength: 20, minLength: 3}} 
                            render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
                                <TextField
                                    onChange={onChange} 
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}                            
                                    type="text"
                                    label='provincia'
                                    variant="outlined"
                                    fullWidth
                                    sx={{mb:2}}
                                />
                            )}
                        />      
                        { errors.provincia &&  <FormHelperText error>Este campo es obligatorio</FormHelperText>}  

                        <Controller
                            name="postalCode"
                            control={control}
                            rules={{required: true, maxLength: 20, minLength: 3}} 
                            render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
                                <TextField
                                    onChange={onChange} 
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}                            
                                    type="text"
                                    label='postalCode'
                                    variant="outlined"
                                    fullWidth
                                    sx={{mb:2}}
                                />
                            )}
                        />
                        { errors.postalCode &&  <FormHelperText error>Este campo es obligatorio</FormHelperText>}   

                        <Box sx={{mt:3}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={isValid ? onNextStep : undefined}
                                >
                                    Continuar
                                </Button>
                            </Box>            
                    </form>
            </Grid>
        </Grid>
    );
};
export default AddressDataForm;