import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup.js";
import Login from "./pages/auth/Login.js";
import ProtectedRoute from "./components/guard/PrivateRoute.js";
import NotFound from "./pages/shared/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// seller
import Dashboard from "./pages/seller/Dashboard";
import Products from "./pages/seller/Products";
import AddProducts from "./pages/seller/AddProducts";
import EditProducts from "./pages/seller/EditProduct";
import Order from "./pages/seller/Order.js";
import SellerProfile from "./pages/seller/SellerProfile.js";
// buyer
import Home from "./pages/buyer/Home.js";
import ProductDetails from "./pages/buyer/ProductDetails.js";
import Cart from "./pages/buyer/Cart.js";
import Checkout from "./pages/buyer/Checkout.js";
import Orders from "./pages/buyer/Orders.js";
import BuyerProfile from "./pages/buyer/BuyerProfile.js";
import PublicRoute from "./components/guard/PublicRoute.js";
import Navbar from "./components/layout/Navbar.js";
function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />
      <Routes>
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
        <Route path="*" element={<NotFound />} />
        {/* Seller */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/products"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/add-products"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <AddProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/edit-product"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <EditProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/order"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/profile"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerProfile />
            </ProtectedRoute>
          }
        />
        {/* Buyer */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product-details"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer-profile"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
