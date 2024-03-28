import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import * as React from 'react'
import { IComic } from 'interface/comics'

export interface CardCheckoutProps {
    comic: IComic;
};

export default function CardCheckout ({ comic}: CardCheckoutProps) {
  return (
    <Card sx={{ width: 350 }}>
      <CardMedia sx={{ height: 300 }} image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} title={`${comic.title} imagen`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {comic.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '1rem' }}>
          <span>${comic.price}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};