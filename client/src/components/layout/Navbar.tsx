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
  FaAd,
  FaClipboardList,
  FaShareAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const Navbar = () => {
  const { token } = useAuth();
  const role = useSelector((state: RootState) => state.auth.user?.role);
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
                to="/seller/orders"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaClipboardList />
                {open && "Orders"}
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
              <Link
                to="/share-app"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaShareAlt />
                {open && "Share App"}
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
                to="/cart"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaShoppingCart />
                {open && "Cart"}
              </Link>
              <Link
                to="/my-orders"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaClipboardList />
                {open && "My Order"}
              </Link>
              <Link
                to="/buyer-profile"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaUserCircle />
                {open && "Profile"}
              </Link>
              <Link
                to="/share-app"
                className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaShareAlt />
                {open && "Share App"}
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
