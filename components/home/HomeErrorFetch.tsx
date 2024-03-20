
import { Box, Typography } from "@mui/material";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";

interface HomeErrorFetchProps {
    error: Error
};
export const HomeErrorFetch = ({error}:HomeErrorFetchProps) => {
    return (
        <Box sx={{ width: "80%", margin: "auto"}}>
            <BodySingle title='Marvel Comics'>
                <Typography color='error' component='p'>{error.message}</Typography>
            </BodySingle>                    
        </Box>         
    )
}