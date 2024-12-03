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
    { text: 'Dashboard', icon: React.createElement(DashboardIcon), path: '/' },
    { text: 'Add Product', icon: React.createElement(AddIcon), path: '/add-product' },
    { text: 'Orders', icon: React.createElement(OrdersIcon), path: '/orders' },
    { text: 'Refund Requests', icon: React.createElement(RefundIcon), path: '/refund-request' },
  ];

  return React.createElement(
    Drawer,
    {
      variant: 'permanent',
      sx: {
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          mt: '64px', // Header height
          backgroundColor: '#fff',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
    React.createElement(
      Box,
      { sx: { overflow: 'auto', mt: 2 } },
      React.createElement(
        List,
        null,
        menuItems.map((item) =>
          React.createElement(
            ListItem,
            { key: item.text, disablePadding: true },
            React.createElement(
              ListItemButton,
              {
                selected: location.pathname === item.path,
                onClick: () => navigate(item.path),
                sx: {
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  },
                  borderRadius: '0 24px 24px 0',
                  mr: 2,
                  mb: 1,
                },
              },
              React.createElement(ListItemIcon, null, item.icon),
              React.createElement(ListItemText, { primary: item.text })
            )
          )
        )
      )
    )
  );
};

export default SidebarComponent;
