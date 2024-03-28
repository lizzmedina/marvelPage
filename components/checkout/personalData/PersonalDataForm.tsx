import { Box, TextField, Button, FormHelperText, Grid } from "@mui/material";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface PersonalDataFormProps {
    initialValues: CheckoutInput["customer"];
    onNextStep: () => void;
};

const PersonalDataForm = ({onNextStep, initialValues,}: PersonalDataFormProps) => {

    const initial = {
        name: '',
        lastname: "",
        email: "",
    };

    const {control, handleSubmit, formState: { errors, isValid }, watch} = useForm<CheckoutInput["customer"]>({
        defaultValues: initial,
        criteriaMode: "all"
    });
    const onSubmit: SubmitHandler<CheckoutInput["customer"]> = (data) => console.log(data);
    
    // console.log({initialValues, initial})
    // console.log({isValid, total: Object.keys(errors).length, errors});


    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
                <form onSubmit={handleSubmit(onNextStep)}>
                    <Controller
                        name="name"
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
                    {errors.name && (
                        <FormHelperText error sx={{mb:2}}>{errors.name.message}</FormHelperText>
                    )}

                    <Controller
                        name="lastname"
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
                    {errors.lastname && (
                        <FormHelperText error sx={{mb:2}}>{errors.lastname?.message}</FormHelperText>
                    )}

                    <Controller
                        name="email"
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
                    {errors.email && (
                        <FormHelperText error sx={{mb:2}}> {errors.email.message} </FormHelperText>
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
