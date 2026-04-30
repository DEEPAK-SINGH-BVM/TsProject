import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode;
  allowedRoles?: string[];
}
const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  // const children = props.children;
  // console.log("children", children);
  // const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role");
  const { token, role } = useAuth();
  const shop = useSelector((state: any) => state.shop .shop);
  console.log("ProtectedRouteShopssss", shop);
  console.log("allowedRoles", allowedRoles);

  console.log("ProtectedRouteToken", token);
  console.log("ProtectedRouteRole", role);

  console.log("role", role);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    if (role === "seller") {
      if (shop) {
        return <Navigate to="/seller/dashboard" replace />;
      } else {
        return <Navigate to="/seller/create-shop" replace />;
      }
    } else {
      return <Navigate to="/home" replace />;
    }
  }
  return children;
};

export default ProtectedRoute;
