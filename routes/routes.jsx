import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../src/pages/Dashboard/Dashboard'

function routes() {
  return (
    <div>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default routes