import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode;
}

const SellerRoute = ({ children }: Props) => {
  const { token } = useAuth();

  const role = useSelector(
    (state: any) => state.auth.user?.role,
  );

  const shop = useSelector(
    (state: any) => state.shop.shop,
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "seller") {
    return <Navigate to="/home" replace />;
  }

  if (!shop) {
    return (
      <Navigate
        to="/seller/create-shop"
        replace
      />
    );
  }

  return children;
};

export default SellerRoute;