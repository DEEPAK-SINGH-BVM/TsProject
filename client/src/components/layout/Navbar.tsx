import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
const Navbar = () => {
  const { token, role } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            MyEcom
          </Link>

          <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
            <FaBars />
          </button>
        </div>
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent 
          flex-col md:flex-row items-start md:items-center gap-6 p-4 md:p-0
          ${open ? "flex" : "hidden"} md:flex`}
        >
          {token ? (
            <>
              {role === "seller" ? (
                <>
                  <Link to="/seller/dashboard" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/seller/products" onClick={() => setOpen(false)}>
                    Products
                  </Link>
                  <Link
                    to="/seller/profile"
                    onClick={() => setOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center"
                  >
                    <FaUserCircle size={24} />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/home"
                    onClick={() => setOpen(false)}
                    className="text-lg"
                  >
                    Home
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setOpen(false)}
                    className="text-lg"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/buyer-profile"
                    onClick={() => setOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center"
                  >
                    <FaUserCircle size={24} />
                  </Link>
                </>
              )}
              {/* <button
                onClick={logout}
                className="bg-red-500 text-white p-2 rounded"
              >
                Logout
              </button> */}
            </>
          ) : (
            <>
              <Link to="/login" className="text-lg">
                Login
              </Link>
              <Link to="/signup" className="text-lg">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
