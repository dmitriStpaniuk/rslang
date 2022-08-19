import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';



export const Headers = () => {
  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Word Learn Web
          </Typography>
          <Button color="inherit">
            <RouterLink style={{ textDecoration: 'none', color:'inherit' }} to={`login`}>
              Login
            </RouterLink>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
