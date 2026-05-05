import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStore, FaPhone, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import {
  getShopAction,
  uploadShopLogoAction,
} from "../../store/feature/shop";
import { cardStyles as styles } from "../../styles/card.styles";


const MyShop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wholeState = useSelector((state: any) => state);
  console.log("WholeState", wholeState);

  const shop = useSelector((state: any) => state.shop.shop);
  console.log("MyShopShop", shop);
  useEffect(() => {
    dispatch(getShopAction());
  }, []);
  const navigate = useNavigate();
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Shop</h1>
        <p style={styles.subtitle}>
          Manage your shop details and basic information
        </p>
      </div>

      <div style={{ ...styles.card, ...styles.flex }}>
        <label style={{ cursor: "pointer" }}>
          {shop?.logo ? (
            <img src={shop.logo} style={styles.avatar} />
          ) : (
            <div style={styles.fallbackAvatar}>
              <FaStore size={30} />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("logo", file);
              dispatch(uploadShopLogoAction(formData));
            }}
          />
        </label>

        <div>
          <h2 style={styles.name}>{shop?.name}</h2>
          <p style={styles.text}>{shop?.category}</p>
          <span style={styles.badge}>Seller Shop</span>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Shop Details</h3>

        <div
          style={{
            display: "grid",
            gap: "10px",
            fontSize: "0.875rem",
            color: "#374151",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaTag />
            <span>{shop?.description}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaPhone />
            <span>{shop?.phone}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaMapMarkerAlt />
            <span>
              {shop?.address}, {shop?.city}, {shop?.state}
            </span>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <button
          style={styles.buttonPrimary}
          onClick={() => navigate("/seller/create-shop", { state: { shop } })}
        >
          Edit Shop
        </button>
      </div>
    </div>
  );
};

export default MyShop;
