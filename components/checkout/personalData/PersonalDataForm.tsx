import {
  Box,
  TextField,
  Button,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

interface IPersonalDataFormProps {
    name: string;
    lastName: string;
    email: string;
};
interface FormProps {
    onNextStep: () => void;
    onPreviousStep?: () => void;
};

const PersonalDataForm = ({ onNextStep }: FormProps) => {
    
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
        watch,
    } = useForm<IPersonalDataFormProps>();

    const router = useRouter();

    const onContinue = (data: IPersonalDataFormProps) => {
        console.log("probando el botón, data: ", data);
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
            <form onSubmit={handleSubmit(onContinue)}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: true, maxLength: 20, minLength: 3 }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        type="text"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    )}
                />
                {errors.name && (
                    <FormHelperText error>Este campo es obligatorio</FormHelperText>
                )}

                <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{ required: true, maxLength: 20, minLength: 3 }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        type="text"
                        label="Lastname"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    )}
                />
                {errors.lastName && (
                    <FormHelperText error>Este campo es obligatorio</FormHelperText>
                )}

                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        type="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    )}
                />
                {errors.email && (
                    <FormHelperText error>Este campo es obligatorio</FormHelperText>
                )}

                <Box mt={2} display="flex" justifyContent="space-between">                    
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

export default PersonalDataForm;
