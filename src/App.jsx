import React from 'react'
import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import Search from './Components/Search'
import Avatar from './Components/Avatar';


export default function App() {
  return (
    <BrowserRouter>  
   <Routes> 
    <Route path="/search" element={<Search/>} />    
    <Route path="/avatar" element={<Avatar/>} />    
   </Routes> 
   </BrowserRouter>   
  )
}
