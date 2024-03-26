import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import BodySingle from '../layouts/body/single/body-single';
import { Button, CardActions, Grid } from '@mui/material';
import { useRouter } from 'next/router';

export interface PropsCharacterCard {   
    name: string,
    description: string,
    thumbnail: {
        path: string
        extension: string
    }
    id: number,
};


const CardCharacter: React.FC<PropsCharacterCard> = ({ name, description, thumbnail, id }) => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };
    return (
        <BodySingle>
            <Grid container xs={12}>
                <Card sx={{ maxWidth: 345 }}>
                <CardActions sx={{  justifyContent: 'flex-start', padding: 2 }}>
                                        <Button
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'white',
                                                border: '1px solid'
                                            }}
                                            onClick={handleBack}
                                            variant="contained"
                                        >
                                            Atrás
                                        </Button>
                                    </CardActions>
                <CardMedia
                    sx={{ height: 300 }}
                    image={`${thumbnail?.path}.${thumbnail?.extension}`}
                    title={`${name} imagen`}
                />
                <CardContent>
                    <Typography color='secondary' gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body1" color="primary.ligth">
                        {description === ''
                            ? "Sin descripción disponible"
                            : description
                        }
                    </Typography>
                </CardContent>
            </Card>
            </Grid>
            
        </BodySingle>       
    );
}
export default CardCharacter;