import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthLayout from "../components/layout/AuthLayout";
import PublicRoute from "../components/guard/PublicRoute";
import Signup from "../pages/auth/Signup.js";
import Login from "../pages/auth/Login.js";
import ForgotPassword from "../pages/auth/ForgotPassword.js";
import ResetPassword from "../pages/auth/ResetPassword";
import NotFound from "../pages/shared/NotFound.js";
import CreateShop from "../pages/seller/CreateShop.js";
import ProtectedRoute from "../components/guard/ProtectedRoute";
import Layout from "../components/layout/SellerLayout.js";
import Dashboard from "../pages/seller/Dashboard.js";
import Products from "../pages/seller/Products.js";
import AddProducts from "../pages/seller/AddProducts.js";
import Order from "../pages/seller/Order.js";
import Profile from "../pages/user/Profile.js";
import MyShop from "../pages/seller/MyShop.js";
import Home from "../pages/buyer/Home.js";
import ProductDetails from "../pages/buyer/ProductDetails.js";
import Cart from "../pages/buyer/Cart.js";
import Checkout from "../pages/buyer/Checkout.js";
import EditProduct from "../pages/seller/EditProduct.js";
import OtpPage from "../pages/auth/OtpPage.js";

const AppRoutes = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <PublicRoute>
                <OtpPage />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* Seller */}
        <Route
          path="/seller"
          element={<AuthLayout />}
          // element={<Layout />}
        >
          <Route path="create-shop" element={<CreateShop />} />
        </Route>
        <Route
          path="/seller"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="products" element={<Products />} />
          <Route path="add-products" element={<AddProducts />} />
          <Route path="edit-product" element={<EditProduct />} />
          <Route path="orders" element={<Order />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shop" element={<MyShop />} />
        </Route>
        {/* Buyer */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="product-details" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="buyer-profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
