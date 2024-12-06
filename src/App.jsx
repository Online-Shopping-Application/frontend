import React from 'react';
import { Toaster } from 'react-hot-toast';
import GlobalRouter from './routes';


export default function App() {
  return ( <div>
    <GlobalRouter/>
    <Toaster/>
  </div>
  )
}
