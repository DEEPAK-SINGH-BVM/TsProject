import {
  FiBox,
  FiShoppingCart,
  FiDollarSign,
  FiClock,
  FiPackage,
  FiUser,
  FiShoppingBag,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <p className="text-lg  text-gray-500">Total Products</p>
            <FiPackage className="text-gray-400 text-xl" />
          </div>
          <div className="text-3xl font-bold mt-3 text-gray-900">120</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Orders</p>
            <FiShoppingCart className="text-gray-400 text-xl" />
          </div>
          <div className="text-3xl font-bold mt-3 text-gray-900">85</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Revenue</p>
            <FiDollarSign className="text-gray-400 text-xl" />
          </div>
          <div className="text-3xl font-bold mt-3 text-gray-900">₹45,000</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <FiClock className="text-gray-400 text-xl" />
          </div>
          <div className="text-3xl font-bold mt-3 text-gray-900">12</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-5 text-gray-800">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/seller/add-products")}
              className="flex items-center justify-between bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg transition"
            >
              <span>Products</span>
              <FiBox />
            </button>

            <button
              onClick={() => navigate("/seller/orders")}
              className="flex items-center justify-between bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg transition"
            >
              <span>Orders</span>
              <FiShoppingCart />
            </button>

            <button
              onClick={() => navigate("/seller/shop")}
              className="flex items-center justify-between bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg transition"
            >
              <span>My Shop</span>
              <FiShoppingBag />
            </button>

            <button
              onClick={() => navigate("/seller/profile")}
              className="flex items-center justify-between bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg transition"
            >
              <span>Profile</span>
              <FiUser />
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-5 text-gray-800">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Pending Orders</span>
              <span className="font-medium">12</span>
            </div>

            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Processing</span>
              <span className="font-medium">8</span>
            </div>

            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Delivered</span>
              <span className="font-medium">65</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;