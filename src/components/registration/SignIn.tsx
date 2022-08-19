import { Lock } from "@mui/icons-material"
import { Avatar, Button, createTheme, CssBaseline, Grid, IconButton, Link, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box } from "@mui/system"
import axios from "axios"
import { __baseUrl__ } from "../constant"
import login from '../assets/img/login.png'
import CloseIcon from '@mui/icons-material/Close';

type SignUser = {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export const signUser = async (user: SignUser) =>
  await axios.post(__baseUrl__ + 'signin', user);



const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  const data = new FormData(e.currentTarget)
  signUser({
    email: data.get('email'),
    password: data.get('password'),
  })
};
const theme = createTheme();
export const SignIn = () => {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '90vh' }}>
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
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square sx={{ position: "relative" }}>
          <IconButton size='large' sx={{
            color: '#1976d2',
            position: "absolute",
            top: '0',
            right: '0'
          }} onClick={() => navigate('/')}>
            <CloseIcon />
          </IconButton>
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
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
    </ThemeProvider>
  )
}
