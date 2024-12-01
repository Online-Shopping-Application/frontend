import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
//import AppBar from '@mui/material/AppBar';
import { useTheme } from "@mui/material/styles";

// Define the drawer width
const drawerWidth = 280;

export default function SideNav({ mobileOpen, handleDrawerToggle }) {
  // Define hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));


  const drawerContent = (
    <>
      <List
        style={{
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <div>
          <ListItemButton
            disableRipple
            style={{
              paddingLeft: '25px',
              backgroundColor: location.pathname === "/Dashboard" ? '#000000' : 'transparent',
              color: location.pathname === "/Dashboard" ? '#FFFFFF' : '#000000',
              borderRadius: location.pathname === "/Dashboard" ? '10px' : '0',
              width: location.pathname === "/Dashboard" ? '90%' : 'auto',
              margin: location.pathname === "/Dashboard" ? '0 auto' : '0',
            }}
            onClick={() => navigate("/Dashboard")}   //navigate to dashboard page
          >
            <ListItemIcon style={{ color: location.pathname === "/Dashboard" ? '#FFFFFF' : '#000000' }}>
              <SpaceDashboardIcon style={{ fontSize: '30' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" primaryTypographyProps={{
              style: {
                color: location.pathname === "/Dashboard" ? '#FFFFFF' : '#000000',
                fontSize: '18px'
              }
            }}
            />
          </ListItemButton>
          <ListItemButton
            disableRipple
            style={{
              paddingLeft: '25px',
              backgroundColor: location.pathname === "/SellerList" ? '#000000' : 'transparent',
              color: location.pathname === "/SellerList" ? '#FFFFFF' : '#000000',
              borderRadius: location.pathname === "/SellerList" ? '10px' : '0',
              width: location.pathname === "/SellerList" ? '90%' : 'auto',
              margin: location.pathname === "/SellerList" ? '0 auto' : '0',
            }}
            onClick={() => navigate("/SellerList")} //navigate to Seller List page
          >
            <ListItemIcon style={{ color: location.pathname === "/SellerList" ? '#FFFFFF' : '#000000' }}>
              <PeopleIcon style={{ fontSize: '30' }} />
            </ListItemIcon>
            <ListItemText primary="Seller List" primaryTypographyProps={{
              style: {
                color: location.pathname === "/SellerList" ? '#FFFFFF' : '#000000',
                fontSize: '18px'
              }
            }} />
          </ListItemButton>

          <ListItemButton
            disableRipple
            style={{
              paddingLeft: '25px',
              backgroundColor: location.pathname === "/MyProfile" ? '#000000' : 'transparent',
              color: location.pathname === "/MyProfile" ? '#FFFFFF' : '#000000',
              borderRadius: location.pathname === "/MyProfile" ? '10px' : '0',
              width: location.pathname === "/MyProfile" ? '90%' : 'auto',
              margin: location.pathname === "/MyProfile" ? '0 auto' : '0',
            }}
            onClick={() => navigate("/MyProfile")}  //navigate to My Profile page
          >
            <ListItemIcon style={{ color: location.pathname === "/MyProfile" ? '#FFFFFF' : '#000000' }}>
              <PersonIcon style={{ fontSize: '30' }} />
            </ListItemIcon>
            <ListItemText primary="My Profile" primaryTypographyProps={{
              style: {
                color: location.pathname === "/MyProfile" ? '#FFFFFF' : '#000000',
                fontSize: '18px'
              }
            }} />
          </ListItemButton>
        </div>


        <div>
          <ListItemButton
            disableRipple
            style={{
              paddingLeft: '25px',
              backgroundColor: location.pathname === "/Settings" ? '#000000' : 'transparent',
              color: location.pathname === "/Settings" ? '#FFFFFF' : '#000000',
              borderRadius: location.pathname === "/Settings" ? '10px' : '0',
              width: location.pathname === "/Settings" ? '90%' : 'auto',
              margin: location.pathname === "/Settings" ? '0 auto' : '0',
              marginBottom: '85px'
            }}
            onClick={() => navigate("/Settings")}
          >
            <ListItemIcon style={{ color: location.pathname === "/Settings" ? '#FFFFFF' : '#000000' }}>
              <SettingsIcon style={{ fontSize: '30' }} />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{
                style: {
                  color: location.pathname === "/Settings" ? '#FFFFFF' : '#000000',
                  fontSize: '18px'
                },
              }}
            />
          </ListItemButton>
        </div>
      </List>
    </>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            color: "#000000",
            marginTop: theme.spacing(8.9), // Adjust this value based on the AppBar height
            backgroundColor: '#ffffff',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
