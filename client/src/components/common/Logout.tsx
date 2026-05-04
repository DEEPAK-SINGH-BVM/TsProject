import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useAppDispatch } from "../../hook/useAuth";
const Logout = () => {
  localStorage.clear();
  const dispatch = useAppDispatch();
  const {goTo} = useAuth();
  dispatch({ type: "LOGOUT_CLEAR" });

  toast.success("Logout Successful");

  goTo("/login", true);
};
export default Logout;
