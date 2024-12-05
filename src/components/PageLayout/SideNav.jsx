import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { useNavigate, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone';


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
              <ManageAccountsRoundedIcon style={{ fontSize: '30' }} />
            </ListItemIcon>
            <ListItemText primary="Sellers List" primaryTypographyProps={{
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
              backgroundColor: location.pathname === "/ViewRequests" ? '#000000' : 'transparent',
              color: location.pathname === "/ViewRequests" ? '#FFFFFF' : '#000000',
              borderRadius: location.pathname === "/ViewRequests" ? '10px' : '0',
              width: location.pathname === "/ViewRequests" ? '90%' : 'auto',
              margin: location.pathname === "/ViewRequests" ? '0 auto' : '0',
            }}
            onClick={() => navigate("/ViewRequests")}  //navigate to My Profile page
          >
            <ListItemIcon style={{ color: location.pathname === "/ViewRequests" ? '#FFFFFF' : '#000000' }}>
              <ManageSearchTwoToneIcon style={{ fontSize: '30' }} />
            </ListItemIcon>
            <ListItemText primary="View Requests" primaryTypographyProps={{
              style: {
                color: location.pathname === "/ViewRequests" ? '#FFFFFF' : '#000000',
                fontSize: '18px'
              }
            }} />
          </ListItemButton> 
        </div>


        {/* <div>
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
        </div> */}
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
