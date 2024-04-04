import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function Navbar() {
const [user, setUser] = React.useState('');
React.useEffect(()=>{
  const fun = async() => {
    console.log("hi")
    const resp = await axios.get('https://gbuild.onrender.com/api/user');
    console.log(resp.data)
  if(resp){
    setUser(resp.data);
  }else{
    setUser('')
  }
  }
  // fun();
},[])

const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const handlenavigate = (i) => {
  //   console.log("hi")
  //   navigate(red[i])
  // }
  return (
    <div style={{marginBottom : '10px'}}>
       <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page, i) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={handlenavigate(i)} >{page}</Typography>
                </MenuItem>
              ))} */}
               <MenuItem onClick={()=>{
                  navigate('/')
              }} >
              <Typography textAlign="center" >Home</Typography></MenuItem>
              <MenuItem onClick={()=>{
                  navigate('/test')
              }} >
              <Typography textAlign="center" >Test</Typography></MenuItem>
              <MenuItem onClick={()=>{
                  navigate('/attendance')
              }} >
              <Typography textAlign="center" >Attendance</Typography></MenuItem>
              <MenuItem onClick={()=>{
                  navigate('/calendar')
              }} >
              <Typography textAlign="center" >Calendar</Typography></MenuItem>
              <MenuItem onClick={()=>{
                  navigate('/timetable')
              }} >
              <Typography textAlign="center" >Time Table</Typography></MenuItem>
              <MenuItem onClick={()=>{
                  navigate('/expense')
              }} >
              <Typography textAlign="center" >Expense</Typography></MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
             <Button
                key="calendar"
                onClick={()=>{
                  navigate('/')
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
            <Button
                key="test"
                onClick={()=>{
                  navigate('/test')
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Test
              </Button>
              <Button
                key="attendance"
                onClick={()=>{
                  navigate('/attendance')
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Attendance
              </Button>
              <Button
                key="calendar"
                onClick={()=>{
                  navigate('/calendar')
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Calendar
              </Button>
              <Button
                key="timetable"
                onClick={()=>{
                  navigate('/timetable')
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Time Table
              </Button>
              <Button
                key="expens"
                onClick={()=>{
                  navigate('/expense')
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Expense
              </Button>
          </Box>

         {user && user.length > 0? <> <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
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
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box></> : <div style={{display : 'flex'}}>
          <div>
          <Button
          variant='contained'
          color='success'
                key="login"
                onClick={()=>{
                  navigate('/login')
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
          </div>
          <div>
          <Button
                key="signup"
                variant='contained'
                color='success'
                onClick={()=>{
                  navigate('/signup')
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Signup
              </Button>
          </div>
          </div>}
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  )
}
