import { Lock } from "@mui/icons-material"
import { Avatar, Button, createTheme, CssBaseline, Grid, Link, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { __baseUrl__ } from "../constant"
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import login from '../assets/img/login.png'

type CreateUser = {
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

type Error417 = string
type Error422 = { error: { errors: { message: string }[] } }

export const createUser = (user: CreateUser) => {
  return axios.post<{ a: number }>(__baseUrl__ + 'users', user);

}

export const Registration = () => {
  const [error, setError] = useState<string | null>(null)
  let navigate = useNavigate();
  const handleReg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    createUser({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    }).then(() => navigate('/'))
      .catch(e => {
        if (axios.isAxiosError(e)) {
          const error = e as AxiosError<Error417 | Error422>
          // Error 417
          if (typeof error.response?.data === 'string') {
            setError(error.response?.data || null)
          } else {
            // Error 422
            setError(error.response?.data.error.errors[0].message || null)
          }
        }
      })
  };
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Grid  container component="main" sx={{ height: '90vh' }}>
        <CssBaseline />
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
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
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
              Registration
            </Typography>
            <Box component="form" onSubmit={handleReg} sx={{ mt: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TextField
                type='text'
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
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
              <Typography sx={{ color: 'red', mt: 1 }} >{error}</Typography>
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
                Registration
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2" component={RouterLink} to='/login'>
                    {"Registered? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid >
      </Grid >
    </ThemeProvider>
  )
}
