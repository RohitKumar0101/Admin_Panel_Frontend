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
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate, useLocation } from 'react-router-dom';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar({userInfo}) {
  const myLocation = useLocation().pathname.substring(1);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();


  const PersonOutlineStyle =
        {borderRadius: "100%",heigth:"100%",width:"100%", backgroundColor: "#B9D9EB",color:"black", cursor: "pointer" }


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    if(e.target.id !== undefined){
       if(e.target.id === "Logout")
       navigate("/");
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor:'#5b9cc2 !important'} }>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6 !important"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex !important', md: 'flex !important' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '',
              textDecoration: 'none',
            }}
          >
            
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}> */}
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            > */}
              {/* <MenuIcon /> */}
            {/* </IconButton> */}
            {/* <Menu
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          {/* </Box> */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          {/* <Typography
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
          </Typography> */}
          <Box sx={{ flexGrow: 1,display:"flex !important" }}>
            <h1 className='text-3xl font-medium font-mono'>{myLocation}</h1>
          </Box>

          <Box sx={{ flexGrow: 0, display: {xs:"flex",sm:"flex",md:"flex",}}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,height:"3rem",width:"3rem" }}>
                {/* {file?<Avatar alt="Remy Sharp"  src={file}/>:<PersonOutlineIcon sx={{ "&:hover": { opacity: "0.7" } }} style={PersonOutlineStyle} /> } */}
                {userInfo ? <img src={userInfo.Image} alt="Upload Image..." className="rounded-full  h-full w-full object-fill" /> : <div className='h-full w-full '> <PersonOutlineIcon style={ {borderRadius: "100%",height:"100%",width:"100%",padding:"4px", backgroundColor: "#B9D9EB",color:"black", cursor: "pointer" }} /></div>}

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
                <MenuItem key={setting}  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" id={setting}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
