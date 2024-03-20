import {createTheme} from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif'
    },
    palette:{
        primary:{
            main: '#202020', //negro
            light: '#504a4a', // gris
        },
        secondary:{
            main: '#d50000', // rojo oscuro
            
        },
        error:{
            main: red.A700,
        },
    },
});
