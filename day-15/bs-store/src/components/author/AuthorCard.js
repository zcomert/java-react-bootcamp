import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function AuthorCard({ author }) {
   
    return (
        <Card sx={{ maxWidth: 200 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={`/authors/${author.id % 120}.jpg`}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {author.firstName} {author.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {author.email}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
}
