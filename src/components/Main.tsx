import { CardMedia, Container, Grid } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import mainImg from './assets/img/digital-education-main-banner-img.png'
import { Registration } from './registration/Registration'
import { SignIn } from './registration/SignIn'
const Placeholder = () => <Grid container spacing={0}
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
export const Main = () => {
  return (
    <Container sx={{ mt: '1rem' }}>

      <Routes >
        <Route path='/' element={<Placeholder />} />
        <Route path='login' element={<SignIn />} />
        <Route path='register' element={<Registration />} />
      </Routes>
    </Container>
  )
}
