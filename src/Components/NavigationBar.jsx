// NavigationBar.jsx
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";

const NavigationBar = ({ onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "black",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <img src="src\assets\images\logo.png" alt="" width={50} height={70}/>
        </Typography>
        <IconButton
          color="inherit"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={onLogout}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
