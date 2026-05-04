import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useAppDispatch } from "../../hook/useAuth";

// const Logout = () => {
//   // const navigate = useNavigate();
//   const {goTo} = useAuth();
//   const dispatch = useAppDispatch();
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     dispatch({ type: "LOGOUT_CLEAR" });
//     localStorage.removeItem("role");
//     toast.success("Logout Succeessfull")
//     localStorage.clear();
//     goTo("/login",true);
//     // navigate("/login",{replace:true});
//   };
//   return (
//     <div>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };
const Logout = () => {
  localStorage.clear();
  const dispatch = useAppDispatch();
  const {goTo} = useAuth();
  dispatch({ type: "LOGOUT_CLEAR" });

  toast.success("Logout Successful");

  goTo("/login", true);
};
export default Logout;
