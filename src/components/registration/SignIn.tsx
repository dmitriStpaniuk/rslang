import { Lock } from "@mui/icons-material"
import { Avatar, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box } from "@mui/system"
import axios from "axios"
import { __baseUrl__ } from "../constant"
import login from '../assets/img/login.png'
import { useUser } from "../UserProvider"

type SignUser = {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

type ResponseLoginUser = {
  message: string,
  token: string,
  userId: string,
  refreshToken: string,
  name: string,
}

export const signUser = async (user: SignUser) => {
  const response = await axios.post<ResponseLoginUser>(__baseUrl__ + 'signin', user)
  localStorage.setItem('tokenUser', JSON.stringify(response.data.token))
  localStorage.setItem('idUser', JSON.stringify(response.data.userId))
  return response.data
}

export const SignIn = () => {

  let navigate = useNavigate();
  const [, setUser] = useUser()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const response = await signUser({
      email: data.get('email'),
      password: data.get('password'),
    }) 
    setUser({userId: response.userId, name: response.name})
    navigate(-1)
  };
  
  return (
    <Grid container  component="main" sx={{ height: '100%', maxWidth:'1900px' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage: `url(${login})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#1976d2',
          backgroundSize: '100%',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={7}>

        <Box
          sx={{
            position: "relative",
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Lock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              type='email'
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link variant="body2" component={RouterLink} to='/register'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
