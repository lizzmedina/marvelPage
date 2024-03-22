import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography, useMediaQuery, useTheme, IconButton, Collapse } from "@mui/material";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import Link from "next/link";
import { IComic } from "interface/comics";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ComicProps {
    comic: IComic;
}

export const CardComic = ({ comic }: ComicProps) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [expandedDescription, setExpandedDescription] = useState(false);
    const [expandedCharacters, setExpandedCharacters] = useState(false);

    const handleExpandDescriptionClick = () => {
        setExpandedDescription(!expandedDescription);
    };

    const handleExpandCharactersClick = () => {
        setExpandedCharacters(!expandedCharacters);
    };

    return (
        <BodySingle title='Detalle del comic'>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                <Card sx={{ width: '80%', maxWidth: '100%', minHeight: 400 }}>
                        <CardContent sx={{ height: expandedDescription || expandedCharacters ? 'auto' : 'auto', overflow: 'auto' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CardMedia
                                            component="img"
                                            alt={comic.title}
                                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                            sx={{ height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                                        <Typography color='primary.ligtht' sx={{ fontWeight: 'bold', fontSize: isMobile ? 15 : 18}}>{comic.title}</Typography>
                                        <Divider sx={{ marginY: 2, borderColor: "primary" }} />
                                        <Typography gutterBottom variant="body1" sx={{ textDecoration: 'text-decoration-line', fontWeight: 'bold', fontSize: isMobile ? 13 : 15 }}>{` Precio: $${comic.price}`}</Typography>
                                        <Typography sx={{ textDecoration: 'line-through', fontSize: isMobile ? 12 : 14 }} variant="body2" color="error">Precio anterior: ${comic.oldPrice}</Typography>
                                        <Divider sx={{ marginY: 2, borderColor: "primary" }} />
                                        <Typography variant="subtitle1" sx={{ fontSize: isMobile ? 14 : 15, fontWeight: 'bold' }}>
                                            Descripción                                            
                                        </Typography>                                        
                                            {comic.description ? (
                                                <Typography sx={{ fontSize: isMobile ? 12 : 15 }}>{comic.description}</Typography>
                                            ) : (
                                                <Typography sx={{ fontSize: isMobile ? 12 : 15 }}>Sin descripción disponible</Typography>
                                            )}                                        
                                        <Divider sx={{ marginY: 2, borderColor: "primary" }} />
                                        <Typography sx={{ fontSize: isMobile ? 14 : 15, fontWeight: 'bold'  }} variant="subtitle1">
                                            Personajes       
                                        </Typography>           
                                        {comic.characters.items.length > 0 ? (
                                            <Grid container sx={{ display: "flex", paddingLeft: "0", flexWrap: "wrap" }}>
                                                {comic.characters.items.map((character, i) => (
                                                    <Grid item key={i} style={{ listStyleType: "none", marginRight: 10 }}>
                                                        <Link href={`/characters/${character.resourceURI.split("/").pop()}`} passHref>
                                                            <Typography component="a" variant="body2" sx={{ fontSize: isMobile ? 12 : 12 }}>{character.name}</Typography>
                                                        </Link>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        ) : (
                                            <Typography  sx={{ fontSize: isMobile ? 10 : 12 }}>Sin personajes </Typography>
                                        )}     
                                    </Box>
                                    <CardActions sx={{ marginTop: 'auto', justifyContent: 'flex-end', padding: 2 }}>
                            <Button
                                sx={{
                                    fontWeight: 'bold',
                                    background: '#d50000',
                                    color: 'white',
                                    border: '1px solid',
                                    '&:hover': {
                                        backgroundColor: 'white', color: '#e23636', border: '1px solid #e23636',
                                    }
                                }}
                                disabled={comic.stock <= 0}
                                variant="contained"
                            >
                                Comprar
                            </Button>
                        </CardActions>
                                </Grid>
                            </Grid>
                        </CardContent>
                        
                    </Card>
                </Grid>
            </Grid>
        </BodySingle>
    )
}
