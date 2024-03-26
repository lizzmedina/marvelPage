import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    FormHelperText,
    Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

interface IPaymentDataFormProps {
  cardNumber: number;
  userName: string;
  expirationDate: Date;
  securityCode: string;
}
interface FormProps {
    onPreviousStep?: () => void;
}

const PaymentDataForm = ({ onPreviousStep }: FormProps) => {

    const {control,handleSubmit,formState: { errors, isValid },} = useForm<IPaymentDataFormProps>();
    const router = useRouter();

    const onSubmit = (data: IPaymentDataFormProps) => {
        console.log("probando el botón, data: ", data);
    };

    const handleBuyClick = () => {
        isValid && router.push(`/confirmacion-compra`);
    };
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
                <Typography variant="h4" align="center">
                    Buy now
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                            name="cardNumber"
                            control={control}
                            rules={{ required: true, maxLength: 20, minLength: 3 }}
                            render={({
                                field: { onChange, onBlur, value, ref },
                                formState,
                                fieldState,
                            }) => (
                                <TextField
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                type="number"
                                label="cardNumber"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                />
                            )}
                    />
                    {errors.cardNumber && (
                        <FormHelperText error sx={{mb:2}}>Este campo es obligatorio</FormHelperText>
                    )}
                    <Controller
                        name="userName"
                        control={control}
                        rules={{ required: true, maxLength: 20, minLength: 6 }}
                        render={({
                            field: { onChange, onBlur, value, ref },
                            formState,
                            fieldState,
                        }) => (
                            <TextField
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            type="text"
                            label="userName"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            />
                        )}
                    />
                    {errors.userName && (
                    <FormHelperText error sx={{mb:2}}>Este campo es obligatorio</FormHelperText>
                    )}
                    <Controller
                        name="expirationDate"
                        control={control}
                        rules={{
                            required: true,
                            pattern: /^((0[1-9])|(1[0-2]))\/((2[2-9])|([3-9][0-9]))$/,
                        }}
                        render={({
                            field: { onChange, onBlur, value, ref },
                            formState,
                            fieldState,
                        }) => (
                            <TextField
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            type="text"
                            label="expirationDate"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            />
                        )}
                    />
                    {errors.expirationDate && (
                    <FormHelperText error sx={{mb:2}}>Formato fecha Mes/año, ej: 02/24 </FormHelperText>
                    )}

                    <Controller
                        name="securityCode"
                        control={control}
                        render={({
                            field: { onChange, onBlur, value, ref },
                            formState,
                            fieldState,
                        }) => (
                            <TextField
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            type="password"
                            label="securityCode"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            />
                        )}
                    />
                    {errors.securityCode && (
                    <FormHelperText error sx={{mb:2}}>Este campo es obligatorio</FormHelperText>
                    )}

                    <Box sx={{ mt: 3 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={isValid ? handleBuyClick : undefined}
                    >
                        Comprar
                    </Button>
                    </Box>
                </form>
            </Grid>
        </Grid>       
    );
};
export default PaymentDataForm;
