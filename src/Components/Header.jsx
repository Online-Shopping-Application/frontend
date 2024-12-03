import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Avatar,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle,
} from '@mui/icons-material';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  return React.createElement(
    AppBar,
    { position: 'fixed', sx: { backgroundColor: '#000', zIndex: 1201 } },
    React.createElement(
      Toolbar,
      null,
      React.createElement(
        Typography,
        { variant: 'h6', sx: { flexGrow: 1 } },
        'Seller Dashboard'
      ),
      React.createElement(
        Box,
        { sx: { display: 'flex', alignItems: 'center', gap: 2 } },
        React.createElement(
          IconButton,
          { color: 'inherit', onClick: handleNotificationMenuOpen },
          React.createElement(
            Badge,
            { badgeContent: 3, color: 'error' },
            React.createElement(NotificationsIcon)
          )
        ),
        React.createElement(
          IconButton,
          { color: 'inherit', onClick: handleProfileMenuOpen },
          React.createElement(
            Avatar,
            { sx: { width: 32, height: 32, bgcolor: 'white' } },
            React.createElement(AccountCircle, { sx: { color: 'black' } })
          )
        )
      ),
      React.createElement(
        Menu,
        {
          anchorEl: notificationAnchorEl,
          open: Boolean(notificationAnchorEl),
          onClose: handleClose,
          PaperProps: { sx: { width: 320 } },
        },
        React.createElement(
          MenuItem,
          { onClick: handleClose },
          React.createElement(
            Box,
            { sx: { display: 'flex', flexDirection: 'column' } },
            React.createElement(
              Typography,
              { variant: 'subtitle2' },
              'New Order #123'
            ),
            React.createElement(
              Typography,
              { variant: 'caption', color: 'text.secondary' },
              '2 minutes ago'
            )
          )
        ),
        React.createElement(
          MenuItem,
          { onClick: handleClose },
          React.createElement(
            Box,
            { sx: { display: 'flex', flexDirection: 'column' } },
            React.createElement(
              Typography,
              { variant: 'subtitle2' },
              'Refund Request #456'
            ),
            React.createElement(
              Typography,
              { variant: 'caption', color: 'text.secondary' },
              '5 minutes ago'
            )
          )
        )
      ),
      React.createElement(
        Menu,
        { anchorEl, open: Boolean(anchorEl), onClose: handleClose },
        React.createElement(MenuItem, { onClick: handleClose }, 'Profile'),
        React.createElement(MenuItem, { onClick: handleClose }, 'Settings'),
        React.createElement(MenuItem, { onClick: handleClose }, 'Logout')
      )
    )
  );
};

export default Header;
