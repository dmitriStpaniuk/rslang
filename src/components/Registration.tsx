import { Lock } from "@mui/icons-material"
import { Avatar, Button, Checkbox, createTheme, CssBaseline, Drawer, FormControlLabel, Grid, IconButton, Link, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import login from './assets/img/login.png'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const Copyright = (props: any) => {
  return (
    <Typography>
      {'Created project '}
      <Link color='inherit' href='https://github.com/dmitriStpaniuk/'>
        DalnoOld
      </Link>{' '}
      <Link color='inherit' href='https://github.com/lopyx191/'>
        Vseslav
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
type RegistrationProps = {
  cartOpen: boolean,
  closeCart: () => void
}
const theme = createTheme()

export const Registration = ({ cartOpen, closeCart }: RegistrationProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  };
  return (
    <Drawer anchor="right" open={cartOpen} onClose={closeCart}>
      <ThemeProvider theme={theme}>
        <IconButton  sx={{justifyContent: 'flex-end', borderRadius:'0'}} onClick={closeCart}>
          <ChevronRightIcon  />
        </IconButton>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${login})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#1560BD',
              backgroundSize: 'container',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
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
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
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
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Drawer>
  )
}