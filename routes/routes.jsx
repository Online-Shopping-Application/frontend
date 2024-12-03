import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../src/pages/Dashboard/Dashboard'
import SellerList from '../src/pages/SellerListPage/SellerList'
import ProductList from '../src/pages/ProductListPage/ProductList'


function routes() {
  return (
    <div>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/SellerList" element={<SellerList/>} />
        <Route path="/ProductList/:id" element={<ProductList />} /> 
      </Routes>
    </div>
  )
}

export default routes