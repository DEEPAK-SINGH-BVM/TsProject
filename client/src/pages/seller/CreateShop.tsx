import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "../../store";
import { Shop } from "../../types/auth.types";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { createShopAction, updateShopAction } from "../../store/feature/shop";

const CreateShop = () => {
  const auth = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const wholeState = useSelector((state: any) => state);
  console.log("WholeState", wholeState);

  const location = useLocation();
  const shop = useSelector((state: any) => state.shop.shop);
  const navigate = useNavigate();

  const editShop = location?.state?.shop;
  const [form, setForm] = useState<Shop>({
    name:editShop?.name || "",
    description: editShop?.description || "",
    category: editShop?.category || "",
    phone: editShop?.phone || "",
    address: editShop?.address || "",
    city: editShop?.city || "",
    state: editShop?.state || "",
    logo: editShop?.logo || "",
  });

  useEffect(() => {
    if (shop && !editShop) {
      navigate("/seller/dashboard");
    }
  }, [shop]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editShop) {
      dispatch(updateShopAction(form, auth));
    } else {
      dispatch(createShopAction(form, auth));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white border border-gray-100 shadow-sm rounded-2xl p-8 space-y-5"
      >
        {/* Header */}
        <div className="mb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editShop ? "Edit Shop" : "Create Shop"}
          </h2>
          <p className="text-sm text-gray-500">
            Fill in the details below to continue
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Shop Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl 
        focus:outline-none focus:ring-1 focus:ring-gray-300"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl 
        focus:outline-none focus:ring-1 focus:ring-gray-300"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl 
        focus:outline-none focus:ring-1 focus:ring-gray-300"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl 
        focus:outline-none focus:ring-1 focus:ring-gray-300"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl 
        focus:outline-none focus:ring-1 focus:ring-gray-300"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl 
        focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>

        {/* Description full width */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl h-28 
      focus:outline-none focus:ring-1 focus:ring-gray-300"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gray-800 text-white font-medium 
      hover:bg-gray-700 transition shadow-sm"
        >
          {editShop ? "Update Shop" : "Create Shop"}
        </button>
      </form>
    </div>
  );
};

export default CreateShop;
