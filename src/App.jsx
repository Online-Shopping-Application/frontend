import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingCart from './Components/ShoppingCart';
import CheckOut from './Components/CheckOut';
import MyOrder from './Components/MyOrder';



export default function App() {

  return (
    // <div>Online Code Nexus FIT Batch 21</div>
    
    <Routes>
      <Route path="/check-out" element={<CheckOut />} /> 
      <Route path="/shopping-cart" element={<ShoppingCart />} /> 
      <Route path="/my-order" element={<MyOrder />} />
     
    </Routes>
   
    
  )
}
