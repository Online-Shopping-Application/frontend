import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  MoneyOff as RefundIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Add Product', icon: <AddIcon />, path: '/add-product' },
    { text: 'Orders', icon: <OrdersIcon />, path: '/orders' },
    { text: 'Refund Requests', icon: <RefundIcon />, path: '/refund-request' },
  ];

  return (
    <Drawer
    variant="permanent"
    sx={{
      width: 240,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        mt: '64px',
        borderRight: 'none',
        background: '#fff',
        boxShadow: '1px 0 1px rgba(0,0,0,0.12)'
      },
    }}
  >
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  },
                  borderRadius: '0 24px 24px 0',
                  mr: 2,
                  mb: 1,
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SidebarComponent;