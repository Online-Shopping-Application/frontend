import React from "react";
import { Box, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';  // Example icon for Dashboard
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; 
 // Example icon for Add Product
import { MoneyOff } from "@mui/icons-material";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", key: "dashboard", path: "/sellerlandingpage", icon: <SpaceDashboardIcon /> },
    { text: "Add Product", key: "addProduct", path: "/addProduct", icon: <AddShoppingCartIcon /> },
    { text: "Order List", key: "orderList", path: "/orderList", icon: <AddShoppingCartIcon /> },
    { text: "Refund List", key: "RefundList", path: "/refund-orders", icon: <MoneyOff /> },
    // { text: "Refund Request", key: "refundRequest", path: "/refundRequest", icon: <SpaceDashboardIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h6">Seller Panel</Typography>
      </Box>
      <List sx={{ marginTop: '40px'}}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.key}
            onClick={() => navigate(item.path)}
            sx={{
              backgroundColor: location.pathname === item.path ? '#000000' : 'transparent',
              color: location.pathname === item.path ? '#FFFFFF' : '#000000',
              borderRadius: location.pathname === item.path ? '10px' : '0',
              width: location.pathname === item.path ? '90%' : 'auto',
              margin: location.pathname === item.path ? '0 auto' : '0',
              paddingLeft: '25px', // Adjust padding to align icons and text
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? '#FFFFFF' : '#000000',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                style: {
                  color: location.pathname === item.path ? '#FFFFFF' : '#000000',
                  fontSize: '18px',cursor:'pointer',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
