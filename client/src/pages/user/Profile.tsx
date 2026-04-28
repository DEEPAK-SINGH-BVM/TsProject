import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { uploadProfileImageAction } from "../auth/redux/action";
import { useAppDispatch } from "../../hook/useAuth";
import { UpdateAddressAction } from "../auth/redux/action";
import { FaUserCircle } from "react-icons/fa";
const Profile = () => {
  const { logout } = useAuth();
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
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-gray-50  mt-11">
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 flex items-center gap-4">
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
          <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500 text-sm">{user?.email}</p>
          <span className="inline-block mt-1 text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
            {user?.role}
          </span>
        </div>
      </div>
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 space-y-4">
        <h3 className="text-gray-800 font-semibold text-lg">Address</h3>

        <textarea
          placeholder="Enter your delivery address"
          className="w-full border border-gray-200 p-3 rounded-xl h-24 focus:outline-none focus:ring-1 focus:ring-gray-300"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          onClick={handleSaveAddress}
          className="px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          Save Address
        </button>
      </div>
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
        <button
          onClick={logout}
          className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
