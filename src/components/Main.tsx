import { CardMedia, Container, Grid } from '@mui/material'
import mainImg from './assets/img/digital-education-main-banner-img.png'
export const Main = () => {
  return (
    <Container sx={{ mt: '1rem' }}>
      <Grid container spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        height='90vh'
      >
        <Grid item>
          <CardMedia
            component='img'
            width='100%'
            image={mainImg}
            alt='main-img'
          />
        </Grid>
      </Grid>
    </Container >
  )
}
