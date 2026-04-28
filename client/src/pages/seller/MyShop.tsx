import React from "react";
import { useSelector } from "react-redux";
import { FaStore, FaPhone, FaMapMarkerAlt, FaTag } from "react-icons/fa";

const MyShop = () => {
  const shop = useSelector((state: any) => state.auth.shop);
  console.log("MyShopShop", shop);
  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 space-y-6 bg-gray-50">
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 flex items-center gap-5">
        {shop?.logo ? (
          <img
            src={shop.logo}
            alt="shop"
            className="w-20 h-20 rounded-xl object-cover border"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-xl">
            <FaStore size={30} />
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-gray-800">{shop?.name}</h2>
          <p className="text-gray-500 text-sm">{shop?.category}</p>
          <span className="inline-block mt-1 text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
            Seller Shop
          </span>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Shop Details</h3>

        <div className="grid gap-3 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <FaTag />
            <span>{shop?.description}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaPhone />
            <span>{shop?.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>
              {shop?.address}, {shop?.city}, {shop?.state}
            </span>
          </div>
        </div>
      </div>

      {/* <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 flex gap-3">
        <button className="px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition">
          Edit Shop
        </button>
      </div> */}
    </div>
  );
};

export default MyShop;
