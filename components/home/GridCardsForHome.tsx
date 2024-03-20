import { Container, Grid } from "@mui/material";
import CardHome, { CardHomeProps } from "./CardHome";

interface HomeProps {
    comics: CardHomeProps[];
}

const GridCardsForHome: React.FC<HomeProps> = ({ comics}) => {
    console.log('homecomponent' , comics);
    
    return(
        <Container>
            <Grid container spacing={3}>
                {comics.map((comic) => (
                    <Grid item key={comic.id} xs={12} sm={6} md={4}>
                        <CardHome id={comic.id} title={comic.title} image={comic.image} />
                    </Grid>
                ))}
            </Grid>
        </Container>        
    )
}
export default GridCardsForHome;