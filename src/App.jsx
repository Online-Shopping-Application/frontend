// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SellerLandingPage from './SellerLandingPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main page route at root (/) */}
        <Route path="/" element={<div>Online Code Nexus FIT Batch 21</div>} />
        
        {/* Seller landing page route */}
        <Route path="/sellerlandingpage" element={<SellerLandingPage />} />
      </Routes>
    </Router>
  );
}
