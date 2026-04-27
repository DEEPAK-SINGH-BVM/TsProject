import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", sales: 50 },
  { name: "Tue", sales: 200 },
  { name: "Wed", sales: 150 },
  { name: "Thu", sales: 300 },
  { name: "Fri", sales: 250 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Products</p>
          <div className="text-2xl font-bold text-gray-800 mt-2">120</div>
          <p className="text-green-500 text-sm mt-1">+12% this month</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Orders</p>
          <div className="text-2xl font-bold text-gray-800 mt-2">85</div>
          <p className="text-blue-500 text-sm mt-1">+8% this month</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Revenue</p>
          <div className="text-2xl font-bold text-gray-800 mt-2">₹45,000</div>
          <p className="text-purple-500 text-sm mt-1">+5% this month</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Pending</p>
          <div className="text-2xl font-bold text-gray-800 mt-2">12</div>
          <p className="text-red-500 text-sm mt-1">-3% this month</p>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* RECENT ORDERS */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Orders
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Order #101</span>
              <span className="text-yellow-500 text-sm">Pending</span>
            </div>

            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Order #102</span>
              <span className="text-green-500 text-sm">Delivered</span>
            </div>

            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Order #103</span>
              <span className="text-blue-500 text-sm">Processing</span>
            </div>
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top Products
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Shoes</span>
              <span className="text-gray-600">120 sold</span>
            </div>

            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>T-Shirt</span>
              <span className="text-gray-600">90 sold</span>
            </div>

            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Watch</span>
              <span className="text-gray-600">70 sold</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* GRAPH */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Sales Graph
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/seller/add-products")}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
            >
              Add Product
            </button>

            <button
              onClick={() => navigate("/seller/orders")}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
            >
              View Orders
            </button>

            <button
              onClick={() => navigate("/seller/products")}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
            >
              Manage Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
