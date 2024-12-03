import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex'}}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px', // Header height
          ml: '240px', // Sidebar width
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          marginLeft: '30px',
          
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;