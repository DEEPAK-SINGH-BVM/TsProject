import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../store";
import { Shop } from "../../types/auth.types";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { createShopAction, updateShopAction } from "../../store/feature/shop";

const CreateShop = () => {
  const auth = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
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

  // useEffect(() => {
  //   if (editShop) {
  //     setForm(editShop);
  //   }
  // }, [editShop]);

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">
          {" "}
          {editShop ? "Edit" : "Create"}Shop
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Shop Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />
        <button
          type="submit"
          className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
        >
          {editShop ? "Edit" : "Create"} Shop
        </button>
      </form>
    </div>
  );
};

export default CreateShop;
