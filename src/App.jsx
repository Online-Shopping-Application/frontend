import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartButton from './Pages/CartButton';


export default function App() {
  return (
    // <div>Online Code Nexus FIT Batch 21</div>

    <Routes>

      <Route path="/cart-button" element={<CartButton />} /> {/* CartButton Page */}

    </Routes>
    
  )
}
