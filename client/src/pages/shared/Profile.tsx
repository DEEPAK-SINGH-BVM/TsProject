import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
const Profile = () => {
  const { logout } = useAuth();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("ProfileUser", user);
  const [address, setAddress] = useState("");

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen mt-11">
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 flex items-center gap-4">
        <FaUserCircle size={70} className="text-gray-400" />

        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>

          <p className="text-gray-500 text-sm">{user.email}</p>

          <span className="inline-block mt-1 text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
            {user.role}
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

        <button className="px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition">
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
