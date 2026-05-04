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
import PublicRoute from "./components/guard/PublicRoute";
import Profile from "./pages/user/Profile.jsx";

// layout
import AuthLayout from "./components/layout/AuthLayout";
import CreateShop from "./pages/seller/CreateShop";
import MyShop from "./pages/seller/MyShop.js";
import Layout from "./components/layout/SellerLayout";
import ForgotPassword from "./pages/auth/ForgotPassword.js";
import ResetPassword from "./pages/auth/ResetPassword.js";
//
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
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
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
          <Route path="edit-product" element={<EditProducts />} />
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
}

export default App;
