import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SidebarComponent from './SidebarComponent';

const Dashboard = () => { 
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#fff' }}>
      <Header />
      <SidebarComponent />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: '78px',
          backgroundColor: '#fff',
          width: '85vw',
          height: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;