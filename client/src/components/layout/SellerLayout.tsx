import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar />
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout