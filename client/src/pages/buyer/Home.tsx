import React from 'react'
import { useAuth } from '../../context/AuthContext'
const Home = () => {
  const {logout} =useAuth();
  return (
    <div>
      <div>Home</div>
      {/* <Logout/> */}
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  )
}

export default Home