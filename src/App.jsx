import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingCart from './Components/ShoppingCart';
import CheckOut from './Components/CheckOut';
import MyOrder from './Components/MyOrder';
import ShoppingPage from './Pages/ShoppingPage';
import SelectItem from './Components/SelectItem';
import ShoppingCartPage from './Pages/ShoppingCartPage';



export default function App() {

  return (
    // <div>Online Code Nexus FIT Batch 21</div>
    
    <Routes>
      <Route path="/check-out" element={<CheckOut />} /> 
      <Route path="/shopping-cart" element={<ShoppingCart />} /> 
      <Route path="/my-order" element={<MyOrder />} />
      <Route path="/shopping-page" element={<ShoppingPage />} />
      <Route path="/shopping-cart-page" element={<ShoppingCartPage />} />
      <Route path="/select-item" element={<SelectItem />} />
     
    </Routes>
   
    
  )
}
