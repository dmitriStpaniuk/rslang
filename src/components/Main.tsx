import { CardMedia, Container, Grid } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import mainImg from './assets/img/digital-education-main-banner-img.png'
import { CardMain } from './cards/CardMain'
import { axiosApiInstance, mainState } from './constant'
import DifficultyLevel from './games/DifficultyLevel'
import { ProfileUser } from './profile/ProfileUser'
import { Registration } from './registration/Registration'
import { SignIn } from './registration/SignIn'
import { SprintGame } from './sprint/SprintGame'


const Placeholder = () =>
  <Grid sx={{ m: 5 }} container spacing={1}
    direction="column"
    alignItems=" flex-start"
    justifyContent="center"
    height='82vh'
    width='90vw'
    flexDirection='row'
  >

    {mainState.map((card) =>
      <Grid item xs={12} sm={12} md={4}>
        <CardMain key={card.title} img={card.img} title={card.title} discription={card.discription} src={card.src} />
      </Grid>)}
 

    <Grid item xs={false} md={9} display={{ xs: "none", sm: "block" }}>
      <CardMedia
        component='img'
        image={mainImg}
        alt='main-img'
      />
    </Grid>
  </Grid>
export const Main = () => {
  return (
    <Container sx={{ mt: '1rem', display: 'flex' }}>
      <Routes >
        <Route path='/' element={<Placeholder />} />
        <Route path='login' element={<SignIn />} />
        <Route path='register' element={<Registration />} />
        <Route path='profile' element={<ProfileUser />} />
        <Route path='difficulty/:id' element={<DifficultyLevel />} />
        <Route path='game/sprint/:id' element={<SprintGame />} />
      </Routes>
    </Container>
  )
}
