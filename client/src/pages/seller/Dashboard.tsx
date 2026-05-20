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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { getMyProductsAction } from "../../store/feature/products/productAction";
import { AppDispatch } from "../../store";
import { getSellerOrdersAction } from "../../store/feature/order/orderAction";
import DashboardSkeleton from "../../components/common/DashboardSkeleton";
import {
  getTotalEarnings,
  getTotalOrders,
  getTotalProducts,
} from "../../utils/calcHelpers";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { product, order, auth } = useSelector((state: any) => state);
  console.log("authAuth", auth);
  const sellerId = auth?.user?._id;
  console.log("sellerIdSocket", sellerId);

  
  const totalProducts = getTotalProducts(product?.products?.data);
  const totalOrders = getTotalOrders(order.orders);
  
  const totalEarnings = getTotalEarnings(order.orders);
  
  const isLoading = order.loading || product.loading;

  const orderStatus = order.orders;

  const orderPending = orderStatus.filter(
    (ord: any) => ord.orderStatus == "Pending",
  ).length;
  
  const orderComplete = orderStatus.filter(
    (ord: any) => ord.orderStatus == "Complete",
  ).length;

  useEffect(() => {
    dispatch(getMyProductsAction());
    dispatch(getSellerOrdersAction());
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:1001");
    socket.emit("joinRoom", sellerId);

    socket.on("orderPlaced", (newOrder) => {
      console.log("New order received:", newOrder);
      dispatch(getSellerOrdersAction());
    });

    return () => {
      socket.off("orderPlaced");
      socket.disconnect();
    };
  }, [sellerId]);
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage your products and orders easily
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="bg-gray-100 p-3 rounded-xl">
              <FiPackage className="text-2xl text-gray-700" />
            </div>

            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
              Products
            </span>
          </div>

          <h2 className="text-3xl f ont-bold mt-5 text-gray-900">
            {totalProducts}
          </h2>

          <p className="text-sm text-gray-500 mt-1">Total uploaded products</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="bg-gray-100 p-3 rounded-xl">
              <FiShoppingCart className="text-2xl text-gray-700" />
            </div>

            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
              Orders
            </span>
          </div>

          <h2 className="text-3xl font-bold mt-5 text-gray-900">
            {totalOrders}
          </h2>

          <p className="text-sm text-gray-500 mt-1">Total customer orders</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="bg-gray-100 p-3 rounded-xl">
              <FiDollarSign className="text-2xl text-gray-700" />
            </div>

            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
              Revenue
            </span>
          </div>

          <h2 className="text-3xl font-bold mt-5 text-gray-900">
            {totalEarnings}
          </h2>

          <p className="text-sm text-gray-500 mt-1">Total Sales</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="bg-gray-100 p-3 rounded-xl">
              <FiClock className="text-2xl text-gray-700" />
            </div>

            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
              Pending
            </span>
          </div>

          <h2 className="text-3xl font-bold mt-5 text-gray-900">
            {orderPending}
          </h2>

          <p className="text-sm text-gray-500 mt-1">Pending orders</p>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Quick Actions
            </h2>

            <div className="h-[2px] w-20 bg-gray-200 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/seller/products")}
              className="group bg-gray-900 text-white p-5 rounded-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Products</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Add & manage products
                  </p>
                </div>

                <FiBox className="text-3xl group-hover:rotate-6 transition" />
              </div>
            </button>

            <button
              onClick={() => navigate("/seller/orders")}
              className="group bg-white border border-gray-200 p-5 rounded-2xl hover:bg-gray-50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Orders
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Track all orders</p>
                </div>

                <FiShoppingCart className="text-3xl text-gray-700 group-hover:rotate-6 transition" />
              </div>
            </button>

            <button
              onClick={() => navigate("/seller/shop")}
              className="group bg-white border border-gray-200 p-5 rounded-2xl hover:bg-gray-50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    My Shop
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">View your store</p>
                </div>

                <FiShoppingBag className="text-3xl text-gray-700 group-hover:rotate-6 transition" />
              </div>
            </button>

            <button
              onClick={() => navigate("/seller/profile")}
              className="group bg-white border border-gray-200 p-5 rounded-2xl hover:bg-gray-50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Profile
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Manage account</p>
                </div>

                <FiUser className="text-3xl text-gray-700 group-hover:rotate-6 transition" />
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Order Summary
          </h2>

          <div className="space-y-11">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="font-medium text-gray-800">Pending Orders</p>
                <p className="text-sm text-gray-500">Waiting for processing</p>
              </div>

              <span className="text-xl font-bold text-gray-900">
                {orderPending}
              </span>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="font-medium text-gray-800">Complete</p>
                <p className="text-sm text-gray-500">Successfully Complete</p>
              </div>

              <span className="text-xl font-bold text-gray-900">
                {orderComplete}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
