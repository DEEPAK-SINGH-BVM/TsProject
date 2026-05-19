import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  // const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role");
  const { token } = useAuth();
  console.log("PublicRouteToken", token);
   const role = useSelector(
    (state:any) => state.auth.user?.role
  );
  console.log("PublicRouteRole", role);
  const shop = useSelector((state: RootState) => state.shop.shop);
  console.log("PublicRouteShops", shop);

  if (token) {
    if (role === "seller" && shop) {
      return <Navigate to="/seller/dashboard" replace />;
    } else if (role === "seller" && shop === null) {
      return <Navigate to="/seller/create-shop" replace />;
    } else {
      return <Navigate to="/home" replace />;
    }
  }
  return children;
};
export default PublicRoute;
