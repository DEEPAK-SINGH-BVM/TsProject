import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { uploadProfileImageAction } from "../../store/feature/auth/action";
import { useAppDispatch } from "../../hook/useAuth";
import { UpdateAddressAction } from "../../store/feature/auth/action";
import { FaUserCircle } from "react-icons/fa";
import { cardStyles as styles } from "../../styles/card.styles";

const Profile = () => {
  const { logout } = useAuth();
  const userCheck = useSelector((state: RootState) => state.auth.user);
  console.log("userCheck", userCheck);

  const user = useSelector((state: RootState) => state.auth.user);
  console.log("ProfileUser", user);
  const [address, setAddress] = useState("");
  const dispatch = useAppDispatch();
  const handleSaveAddress = () => {
    dispatch(UpdateAddressAction(address));
  };
  useEffect(() => {
    if (user?.address) {
      setAddress(user.address || "");
    }
  }, [user?.address]);
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Profile</h1>
        <p style={styles.subtitle}>Manage your account details</p>
      </div>

      <div style={{ ...styles.card, ...styles.flex }}>
        {user?.profileImage ? (
          <img src={user.profileImage} style={styles.avatar} />
        ) : (
          <div style={styles.fallbackAvatar}>
            <FaUserCircle size={40} />
          </div>
        )}

        <div>
          <h2 style={styles.name}>{user?.name}</h2>
          <p style={styles.text}>{user?.email}</p>
          <span style={styles.badge}>{user?.role}</span>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Address</h3>

        <textarea
          style={styles.textarea}
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          style={{ ...styles.buttonPrimary, marginTop: "12px" }}
          onClick={handleSaveAddress}
        >
          Save Address
        </button>
      </div>

      <div style={styles.section}>
        <button style={styles.buttonOutline} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
