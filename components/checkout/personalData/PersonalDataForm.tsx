import { Box, TextField, Button, FormHelperText, Grid } from "@mui/material";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface PersonalDataFormProps {
    initialValues: CheckoutInput["customer"];
    onNextStep: () => void;
};

const PersonalDataForm = ({onNextStep, initialValues,}: PersonalDataFormProps) => {
    const {control, handleSubmit, formState: { errors, isValid }, watch} = useForm<CheckoutInput["customer"]>();
    const onSubmit: SubmitHandler<CheckoutInput["customer"]> = (data) => console.log(data);
    
    const nameinfo = watch('name');
    const lastnameInfo = watch('lastname');
    const emailinfo = watch('email');
    console.log({errors});
    console.log({isValid});
    
    console.log(nameinfo);
    console.log(lastnameInfo);
    console.log(emailinfo);


    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
                <form onSubmit={handleSubmit(onNextStep)}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=''
                        rules={{ required: true, maxLength: 20, minLength: 3 }}
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
                        <FormHelperText error>{errors.name.message}</FormHelperText>
                         //<FormHelperText error sx={{mb:2}}>Este campo es obligatorio. </FormHelperText>
                    )}

                    <Controller
                        name="lastname"
                        control={control}
                        defaultValue=""
                        rules={{ required: true, maxLength: 20, minLength: 3 }}
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
                        // <FormHelperText error>{errors.lastname?.message}</FormHelperText>
                        <FormHelperText error sx={{mb:2}}>Este campo es obligatorio. </FormHelperText>
                    )}

                    <Controller
                        name="email"
                        control={control}
                        defaultValue=''
                        rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
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
                        // <FormHelperText error> {errors.email.message} </FormHelperText>
                        <FormHelperText error sx={{mb:2}}>Este campo es obligatorio. </FormHelperText>
                    )}                    
                </form>
                <Box sx={{ mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={isValid ? onNextStep : undefined}
                        >
                            Siguiente
                        </Button>
                    </Box>
            </Grid>
        </Grid>
    );
};

export default PersonalDataForm;
