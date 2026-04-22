import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Logout = () => {
  // const navigate = useNavigate();
  const {goTo} = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logout Succeessfull")
    goTo("/login",true);
    // navigate("/login",{replace:true});
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Logout;
