import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link as RouterLink } from 'react-router-dom';

type CardMainProps = {
  img: string,
  title: string,
  discription: string,
  src: string
}
export const CardMain = ({ img, title, discription, src }: CardMainProps) => {
  return (
    <Card sx={{ backgroundColor: '#f6f6f6' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      // subheader="September 14, 2016"
      />
      <CardMedia
        sx={{ objectFit: 'contain' }}
        component="img"
        height="150"
        image={img}
        alt={title}
      />
      <CardContent sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {discription}
        </Typography>
        <RouterLink to={`difficulty/${title.toLowerCase()}`}>
          <Button> Start </Button>
        </RouterLink>
      </CardContent>

    </Card>
  );
}
