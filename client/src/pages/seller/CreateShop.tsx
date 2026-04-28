import { useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../store";
import { Shop } from "../../types/auth.types";
import { useAuth } from "../../context/AuthContext";
import { createShopAction } from "../../store/feature/auth";

const CreateShop = () => {
  const auth = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<Shop>({
    name: "",
    description: "",
    category: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    logo: "",
  });

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

    dispatch(createShopAction(form, auth));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Create Shop</h2>

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

        <input
          type="text"
          name="logo"
          placeholder="Logo URL"
          value={form.logo}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
        >
          Create Shop
        </button>
      </form>
    </div>
  );
};

export default CreateShop;
