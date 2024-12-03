import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return React.createElement(
    Box,
    { sx: { display: 'flex' } },
    React.createElement(Header),
    React.createElement(Sidebar),
    React.createElement(
      Box,
      {
        component: 'main',
        sx: {
          flexGrow: 1,
          p: 3,
          mt: '64px', // Header height
          ml: '240px', // Sidebar width
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          marginLeft: '30px',
        },
      },
      React.createElement(Outlet)
    )
  );
};

export default Dashboard;
