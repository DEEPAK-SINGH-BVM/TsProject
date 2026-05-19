import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../store";
import { Shop } from "../../store/feature/unused/auth.types";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
// import { createShopAction, updateShopAction } from "../../store/feature/shop";
import { authStyles as styles } from "../../styles/auth.styles";
import { createShopAction, updateShopAction } from "../../store/feature/shop/shopAction";
const CreateShop = () => {
  const { goTo } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();
  const shop = useSelector((state: RootState) => state.shop.shop);
  const navigate = useNavigate();

  const editShop = location?.state?.shop;
  const [form, setForm] = useState<Shop>({
    name: editShop?.name || "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editShop) {
      dispatch(updateShopAction(form, goTo));
    } else {
      dispatch(createShopAction(form, goTo));
    }
  };
  const categories = [
    "Clothing",
    "Electronics",
    "Groceries",
    "Footwear",
    "Beauty",
    "Furniture",
    "Sports",
    "Books",
    "Accessories",
    "Food",
  ];
  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={{ ...styles.card, maxWidth: "737px" }}>

        <div style={styles.header}>
          <h2 style={styles.title}>{editShop ? "Edit Shop" : "Create Shop"}</h2>
          <p style={styles.subtitle}>Fill in the details below to continue</p>
        </div>

        <div style={styles.grid}>
          <input
            name="name"
            placeholder="Shop Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          {/* <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            style={styles.input}
          /> */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Category</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          {editShop ? "Update Shop" : "Create Shop"}
        </button>
      </form>
    </div>
  );
};

export default CreateShop;
