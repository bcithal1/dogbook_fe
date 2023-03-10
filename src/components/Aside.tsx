import * as React from 'react';
import "@fontsource/neucha"
import "@fontsource/livvic"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { Avatar, Button, Container, IconButton, Menu, Tooltip} from '@mui/material';

const drawerWidth = 350;

const pages = ['Matchs', 'Dog Parks', 'Events', 'Chat'];
const settings = ['Profile', 'Notifications', 'Logout'];


export default function ClippedDrawer() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className='nav' position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 70,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Neucha',
              letterSpacing: '.2rem',
              color: 'inherit',
            }}
          >
            Whistle
          </Typography>

        {/* Top NavBar */}

          <Box className='top-nav' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>


        {/* Icon Dropdown Menu */}

          <Box sx={{ ml: 5, flexGrow: 0 }}>
            <Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    );



      {/* Side Nav */}

      <Drawer 
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <Typography variant="h4" noWrap component="div" className='local'>
            Local Park/s
          </Typography>
        <iframe className='map'  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3249.8485435796983!2d-97.52108534884195!3d35.458543849662504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b2173e6df68307%3A0x7bda6304f19ce865!2sScissortail%20Park%20Dog%20Park!5e0!3m2!1sen!2sus!4v1678303764104!5m2!1sen!2sus"></iframe>

        {/* Discussion Cards */}

        <Typography variant="h5" noWrap component="div" className='group'>
            Discussions Going On
        </Typography>

        <Card className='chat' sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            First Time Dog Owner
          </Typography>
          <Typography variant="body2">
          A group for first time dog owners to get help, tips and tricks on all things potty training, 
          behavioral training and more.
          </Typography>
          <Button size="small" className='join'>
          Join Chat
          </Button>
        </CardContent>
        </Card>

        <Card className='chat' sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
          What's Your Sign?
          </Typography>
          <Typography variant="body2">
          A group for  finding compatible dog breeds in your area!
          </Typography>
          <Button size="small" className='join'>
          Join Chat
          </Button>
        </CardContent>
        </Card>

        </Box>
      </Drawer>
      </Box>
  );
}
