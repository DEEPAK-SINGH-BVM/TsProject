import { useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaStore } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopsAction } from "../../store/feature/shop";
import { AppDispatch } from "../../store";

const Home = () => {
  const shops = useSelector((state: any) => state.shop.shops);
  console.log(shops);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllShopsAction());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaStore className="text-indigo-600" />
          Shops Available
        </h1>
        <p className="text-sm text-gray-500">Browse all available shops</p>
      </div>

      <div className="space-y-4">
        {shops?.map((shop: any) => (
          <div
            key={shop._id}
            className="flex gap-4 bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition"
          >
            <img
              src={shop.logo}
              alt={shop.name}
              className="w-20 h-20 rounded-lg object-cover border"
            />

            <div className="flex-1 space-y-1">
              <h2 className="text-base font-semibold text-gray-800">
                {shop.name}
              </h2>

              <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                {shop.category}
              </span>

              <p className="text-sm text-gray-500">
                {shop.description}
              </p>

              <div className="flex items-center text-xs text-gray-500 gap-1">
                <FaMapMarkerAlt className="text-gray-400" />
                {shop.city}, {shop.state}
              </div>

              <div className="flex items-center text-xs text-gray-500 gap-1">
                <FaPhoneAlt className="text-gray-400" />
                {shop.phone}
              </div>
            </div>

            <div className="flex items-center">
              <button className="px-3 py-1 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                View Products
              </button>
            </div>
          </div>
        ))}
      </div>

      {!shops?.length && (
        <p className="text-center text-gray-500 mt-10">No shops available</p>
      )}
    </div>
  );
};
export default Home;
