import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/router";

export interface CardHomeProps {
    id: number;
    title: string;
    image: string;
}
const CardHome: React.FC<CardHomeProps> = ({ image, title, id }) => {
    const router = useRouter();

    const handleComicDetail = () => {
        router.push(`/comics/${id}`);
    };
    const handleComicBuy = () => {
        router.push(`/checkout`);
    };

    return (
        <Card sx={{ maxWidth: 345, height: "100%", display: "flex",  justifyContent: "space-between",  flexDirection: "column" }}>
            <CardMedia
                component="img"
                alt={title}
                height="140"
                image={image}
                data-testid="comic-image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{title}</Typography>
            </CardContent>
            <CardActions sx={{display:'flex', justifyContent:'space-between'  }}>
                <Button 
                    size="small" 
                    onClick={handleComicBuy} 
                    sx={{
                            fontWeight: 'bold', 
                            background: '#d50000', 
                            color:'white', 
                            border:'1px solid', 
                            '&:hover': {
                                backgroundColor: 'white', color:'#e23636', border:'1px solid #e23636', }
                        }}
                > Comprar</Button>
                <Button  
                    onClick={handleComicDetail} 
                    size="small" 
                    sx={{fontWeight: 'bold', '&:hover': {backgroundColor: '#bdbdbd',   }  }} 
                    color='primary' 
                >Ver Detalle                 
                </Button>
            </CardActions>
        </Card>
    )
}
export default CardHome;