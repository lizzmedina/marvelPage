import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import BodySingle from '../layouts/body/single/body-single';
import { Grid } from '@mui/material';

export interface PropsCharacterCard {   
    name: string,
    description: string,
    thumbnail: {
        path: string
        extension: string
    }
    id: number,
}

const CardCharacter: React.FC<PropsCharacterCard> = ({ name, description, thumbnail, id }) => {
        
    return (
        <BodySingle>
            <Grid container xs={12}>
                <Card sx={{ maxWidth: 345 }}>
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