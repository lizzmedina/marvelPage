import type {NextPage} from 'next';
import {  Typography } from '@mui/material';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';

const Index: NextPage = () => {
    return (        
            <LayoutGeneral title='homePage marvel comics' description='pagina principal marvel comics' keywords='home'>
                <Typography component='h1' variant='h1'> marvel studios</Typography>
            </LayoutGeneral>        
    )
}

export default Index;