import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup.js";
import Login from "./pages/auth/Login.js";
import ProtectedRoute from "./components/guard/ProtectedRoute.js";
import NotFound from "./pages/shared/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// seller
import Dashboard from "./pages/seller/Dashboard";
import Products from "./pages/seller/Products";
import AddProducts from "./pages/seller/AddProducts";
import EditProducts from "./pages/seller/EditProduct";
import Order from "./pages/seller/Order.js";
// buyer
import Home from "./pages/buyer/Home.js";
import ProductDetails from "./pages/buyer/ProductDetails";
import Cart from "./pages/buyer/Cart.js";
import Checkout from "./pages/buyer/Checkout";
import Orders from "./pages/buyer/Orders.js";
import PublicRoute from "./components/guard/PublicRoute";
import Navbar from "./components/layout/Navbar";
import Profile from "./pages/user/Profile.jsx";

// layout
import AuthLayout from "./components/layout/AuthLayout";
import SellerLayout from "./components/layout/SellerLayout";
import BuyerLayout from "./components/layout/BuyerLayout";
import CreateShop from "./pages/seller/CreateShop";
function App() {
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
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* Seller */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="create-shop" element={<CreateShop />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="add-products" element={<AddProducts />} />
          <Route path="edit-product" element={<EditProducts />} />
          <Route path="orders" element={<Order />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* Buyer */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="product-details" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="buyer-profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
