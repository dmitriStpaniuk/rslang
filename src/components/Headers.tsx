import { AppBar, Button, Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Link as RouterLink } from 'react-router-dom';
import { useUser } from './UserProvider';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Main } from './Main';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import withAuth from './WithAuth';

type NavMenuItemProps = {
  path: string;
  icon: JSX.Element;
  name: string;
}

const NavMenuItem = ({ path, icon, name }: NavMenuItemProps) => <ListItemButton component={Link} to={path}>
  <ListItemIcon>{icon}</ListItemIcon>
  <ListItemText primary={name} />
</ListItemButton>

const PrivateNavMenuItem = withAuth(NavMenuItem)

export const Headers = () => {
  const [user] = useUser()
  const [open, setOpen] = useState(false);

  const data = [
    { name: "Home", icon: <HomeIcon />, path: '/' },
    { name: 'Textbook', icon: <MenuBookIcon />, path: '/difficulty/library', isPrivate: false },
    { name: "Hard Word", icon: <TextSnippetIcon />, path: '/dictionary', isPrivate: true },
    { name: "Games", icon: <SportsEsportsIcon />, path: '/game', isPrivate: false },
    { name: "Statistics", icon: <AnalyticsIcon />, path: '/statistic', isPrivate: true },
  ];

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item) => (
        <div key={item.name}>
          {item.isPrivate
            ? <PrivateNavMenuItem path={item.path} icon={item.icon} name={item.name} />
            : <NavMenuItem path={item.path} icon={item.icon} name={item.name} />}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', width: '100%',flexDirection: 'column', height:'50vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setOpen(true)}
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{
            flexGrow: 1,
            fontSize: {
              lg: '1.5rem',
              md: '1rem',
              sm: '1rem',
              xs: 10
            }
          }}>
            Word Learn Web
          </Typography>
          {user
            ? <Button sx={{
              fontSize: {
                lg: '1rem',
                md: '1rem',
                sm: '1rem',
                xs: 10
              }
            }} color="inherit" component={RouterLink} to='/profile'>
              {user.name}
            </Button>
            : <Button color="inherit">
              <RouterLink style={{
                textDecoration: 'none', color: 'inherit'
              }} to={`login`}>
                Login
              </RouterLink>
            </Button>
          }
        </Toolbar>
      </AppBar>
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        <Typography sx={
          {
            textAlign: 'center',
            p: 2
          }
        }>Rs school WLW</Typography>
        {getList()}
      </Drawer>
      <Main />
        {/* <Footer /> */}
    </div >
  )
}
