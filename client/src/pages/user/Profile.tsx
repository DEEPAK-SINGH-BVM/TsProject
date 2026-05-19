import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useAppDispatch } from "../../hook/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { cardStyles as styles } from "../../styles/card.styles";
import { UpdateAddressAction, uploadProfileImageAction } from "../../store/feature/auth/authAction";

const Profile = () => {
  const { logout } = useAuth();
  const userCheck = useSelector((state: RootState) => state.auth);
  console.log("userCheck", userCheck);

  const { user ,loading } = useSelector((state: RootState) => state.auth);
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
  
  // if(loading){
  //   return <ProfileSkeleton/>;
  // }
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Profile</h1>
        <p style={styles.subtitle}>Manage your account details</p>
      </div>

      <div style={{ ...styles.card, ...styles.flex }}>
        <label className="cursor-pointer">
          {user?.profileImage ? (
            <img
              src={user?.profileImage}
              className="w-20 h-20 rounded-full object-cover border"
            />
          ) : (
            <FaUserCircle size={64} />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              console.log("filefile", file);
              if (!file) return;
              const formData = new FormData();
              formData.append("image", file);
              dispatch(uploadProfileImageAction(formData));
            }}
          />
        </label>
        <div>
          <h2 style={styles.name}>{user?.name}</h2>
          <p style={styles.text}>{user?.email}</p>
          <span style={styles.badge}>{user?.role}</span>
        </div>
      </div>

      {/* <div style={styles.section}>
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
      </div> */}
  
      <div style={styles.section}>
        <button style={styles.buttonOutline} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
