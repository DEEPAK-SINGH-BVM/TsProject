import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  // const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role");
  const { token, role } = useAuth();
  console.log("PublicRouteToken", token);
  console.log("PublicRouteRole", role);

  if (token) {
    if (role === "seller") {
      return <Navigate to="/seller/dashboard" replace />;
    } else {
      return <Navigate to="/home" replace />;
    }
  }
  return children;
};
export default PublicRoute;
