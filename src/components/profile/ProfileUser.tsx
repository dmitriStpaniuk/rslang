import { Avatar, Button, Grid, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider"
import avatar from "../assets/img/avatar1.png"


export const ProfileUser = () => {
  let navigate = useNavigate();
  const [user, setUser] = useUser()
  const exitProfile = () => {
    localStorage.clear()
    setUser(null)
    navigate(-1)
  }
  return (
    <Grid container component={Paper} justifyContent='space-between' alignItems='center'>
      <Grid item xs={4} md={4} display='flex' flexDirection='column' alignItems='center'>
        <Avatar alt={user?.name} src={avatar} sx={{ width: '30%', height: '30%' }} />
        <Button onClick={exitProfile}>sign out</Button>
      </Grid>
      <Grid   item xs={8} md={8}>
          {/* <Typography>Statistic</Typography> */}
      </Grid>
    </Grid>
  )
}
