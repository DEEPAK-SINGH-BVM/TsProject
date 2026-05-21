import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaStore,
  FaPhone,
  FaMapMarkerAlt,
  FaTag,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";

import {
  getShopAction,
  uploadShopLogoAction,
} from "../../store/feature/shop/shopAction";

import { MyShopSkeleton } from "../../components/common/MyShopSkeleton";

const MyShop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { shop, loading } = useSelector((state: any) => state.shop);

  useEffect(() => {
    dispatch(getShopAction());
  }, []);

  if (loading) {
    return <MyShopSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Shop</h1>

          <p className="text-gray-500 mt-1">
            Manage your shop details and information
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            
            <label className="relative cursor-pointer w-fit">
              {shop?.logo ? (
                <img
                  src={shop.logo}
                  alt="shop"
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-indigo-100"
                />
              ) : (
                <div className="w-28 h-28 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FaStore size={38} />
                </div>
              )}

              <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-md">
                <FaEdit size={12} />
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  const formData = new FormData();

                  formData.append("logo", file);

                  dispatch(uploadShopLogoAction(formData));
                }}
              />
            </label>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {shop?.name}
              </h2>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                  {shop?.category}
                </span>

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  Seller Shop
                </span>
              </div>

              <p className="text-gray-500 mt-3 leading-relaxed">
                {shop?.description}
              </p>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            
            <div className="border border-gray-200 rounded-xl p-4 bg-slate-50">
              <div className="flex items-center gap-3 text-indigo-600 mb-2">
                <FaPhone />
                <h3 className="font-semibold text-gray-900">Phone</h3>
              </div>

              <p className="text-gray-600">{shop?.phone}</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 bg-slate-50">
              <div className="flex items-center gap-3 text-indigo-600 mb-2">
                <FaTag />
                <h3 className="font-semibold text-gray-900">Category</h3>
              </div>

              <p className="text-gray-600">{shop?.category}</p>
            </div>

            <div className="md:col-span-2 border border-gray-200 rounded-xl p-4 bg-slate-50">
              <div className="flex items-center gap-3 text-indigo-600 mb-2">
                <FaMapMarkerAlt />
                <h3 className="font-semibold text-gray-900">Address</h3>
              </div>

              <p className="text-gray-600">
                {shop?.address}, {shop?.city}, {shop?.state}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() =>
                navigate("/seller/create-shop", {
                  state: { shop },
                })
              }
              className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-xl font-medium shadow-sm"
            >
              Edit Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyShop;