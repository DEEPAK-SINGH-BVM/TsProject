import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "../../store";
import { Shop } from "../../types/auth.types";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { createShopAction, updateShopAction } from "../../store/feature/shop";
import { authStyles  as styles} from "../../styles/auth.styles";
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
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={{ ...styles.card ,maxWidth:"737px"}}>
  
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

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            style={styles.input}
          />

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
