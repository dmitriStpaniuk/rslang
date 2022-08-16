import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Registration } from './Registration';
import { useState } from 'react';



export const Headers = () => {
  const [isCartOpen, setCartOpen] = useState(false)
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
          <Button color="inherit" onClick={() => setCartOpen(true)}>Login</Button>
        </Toolbar>
      </AppBar>
      <Registration cartOpen={isCartOpen} closeCart={() => setCartOpen(false)} />
    </Box>
  )
}
