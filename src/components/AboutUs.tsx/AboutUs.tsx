import { Box, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { cardsAbout } from "../constant"
import { alfaBackground } from "../textbook/alfaBackground"
import TelegramIcon from '@mui/icons-material/Telegram';

export const AboutUs = () => {
  return(
  <Grid
    justifyContent="center"
    container
    sx={{ background: alfaBackground(0, '2') }
    }
  >
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      sx={{ width: 700 }}
    >
      {cardsAbout.map((item, index) => (
      <Card sx={{ display: 'flex' }} key={index}>
        <CardMedia
          component="img"
          height="200"
          image={item.image}
          alt={item.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {item.title}
          </Typography>
        </CardContent>
        <CardActions>
          <a href={item.tg}><TelegramIcon /></a>
        </CardActions>
        </Box>
    </Card>
      ))}
    </Grid>
  </Grid>
  )
} 
