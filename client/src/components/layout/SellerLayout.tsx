import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
const SellerLayout = () => {
  return (
    <div className="flex">
      <Navbar/>
      <main className="flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default SellerLayout