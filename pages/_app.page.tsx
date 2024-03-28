import type { AppProps } from 'next/app'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "dh-marvel/styles/material-theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />      
        <Component {...pageProps} />      
        <style jsx global>
          {`
            /* Other global styles such as 'html, body' etc... */
              #__next {
              height: 100%;
            }
          `}
        </style>
      </ThemeProvider>
  )
}

export default MyApp;
// porner useContext -> para almacenar la data de los form  y posiblemente del comic