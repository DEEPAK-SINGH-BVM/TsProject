import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaHome,
  FaShoppingCart,
  FaBox,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaStore,
} from "react-icons/fa";
const Navbar = () => {
  const { token, role } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`bg-gray-800 text-white h-screen p-4
         ${open ? "w-64" : "w-16"}`}
    >
      <div className="flex items-center justify-between mb-6">
        {open && <p className="text-2xl font-bold">MyEcom</p>}

        <button className="text-2xl" onClick={() => setOpen(!open)}>
          <FaBars />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {token ? (
          role === "seller" ? (
            <>
              <Link
                to="/seller/dashboard"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaTachometerAlt />
                {open && "Dashboard"}
              </Link>

              <Link
                to="/seller/products"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaBox />
                {open && "Products"}
              </Link>
              
              <Link
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
                to="/seller/shop"
              >
                <FaStore />
                {open && "My Shop"}
              </Link>
              
              <Link
                to="/seller/profile"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaUserCircle />
                {open && "Profile"}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/home"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaHome />
                {open && "Home"}
              </Link>

              <Link
                to="/orders"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaShoppingCart />
                {open && "Orders"}
              </Link>

              <Link
                to="/buyer-profile"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaUserCircle />
                {open && "Profile"}
              </Link>
            </>
          )
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaSignInAlt />
              {open && "Login"}
            </Link>

            <Link
              to="/signup"
              className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaUserPlus />
              {open && "Signup"}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
