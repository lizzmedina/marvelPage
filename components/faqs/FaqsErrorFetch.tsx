
import { Box, Typography } from "@mui/material";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";

interface FaqsErrorProps {
    error: Error
};
export const FaqsErrorFetch = ({error}:FaqsErrorProps) => {
    return (
        <Box sx={{ width: "80%", margin: "auto"}}>
            <BodySingle title="Preguntas frecuentes (FAQs)">
                <Typography color='error' component='p'>{error.message}</Typography>
            </BodySingle>                    
        </Box>         
    )
}
