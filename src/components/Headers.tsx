import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from './UserProvider';
import { axiosApiInstance, __baseUrl__ } from './constant';

const userId = localStorage.getItem('idUser')

export const Headers = () => {
  const [user, setUser] = useUser()
  const getUserName = async () => {
    if (userId) await axiosApiInstance.get('users/' + JSON.parse(userId))
      .then(res => {
        setUser(res.data)
      })
  }
  if (!user) getUserName()
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
          {user
            ? <Button color="inherit" component={RouterLink} to='/profile'>
              {user.name}
            </Button>
            : <Button color="inherit">
              <RouterLink style={{ textDecoration: 'none', color: 'inherit' }} to={`login`}>
                Login
              </RouterLink>
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
