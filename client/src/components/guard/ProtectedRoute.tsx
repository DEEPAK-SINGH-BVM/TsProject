import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: Props) => {
  // const children = props.children;
  // console.log("children", children);
  // const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role");
  const { token } = useAuth();
  const shop = useSelector((state: any) => state.shop.shop);
  const role = useSelector((state: any) => state.auth.user?.role);
  console.log("Role", role);

  const wholestate = useSelector((state: any) => state);
  console.log("wholestateShop", wholestate);

  console.log("ProtectedRouteShopssss", shop);

  console.log("ProtectedRouteToken", token);
  console.log("ProtectedRouteRole", role);

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }
  // if (role === "seller" && shop === null) {
  //   return <Navigate to="/seller/create-shop" replace />;
  // }
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (
    window.location.pathname.startsWith("/seller") &&
    role !== "seller"
  ) {
    return <Navigate to="/home" replace />;
  }

  if (role === "seller" && !shop) {
    return <Navigate to="/seller/create-shop" replace />;
  }

  return children;
  // return children;
};

export default ProtectedRoute;
