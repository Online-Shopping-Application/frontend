import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Handle opening the menu when the account icon is clicked
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{width: '100%'}}>
      {/* <AppBar
        style={{
          backgroundColor: '#FFFFFF',
          marginLeft: '280px',
          width: '100vw',
          height: '100px'
        }}
      > */}
      <Toolbar>
        <div style={{ flexGrow: 1, marginTop: '80px' }} />
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle style={{ fontSize: '20px', color: 'black' }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>My profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
      {/* </AppBar> */}
    </Box>
  );
}
