// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SellerLandingPage from './SellerLandingPage';
import OrderStatusPage from './pages/RefundReqPage';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import './index.css';
import RefundReqPage from './pages/RefundReqPage';
import OrdersPage from './pages/OrdersPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main page route at root (/) */}
        <Route path="/" element={<div>Online Code Nexus FIT Batch 21</div>} />
        
        {/* Seller landing page route */}
        <Route path="/sellerlandingpage" element={<SellerLandingPage />} />
        <Route path="/orderpage" element={< OrdersPage/>} />
        <Route path="/refundpage" element={<RefundReqPage />} />


      </Routes>
    </Router>
  );
}
