import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode;
}

const SellerRoute = ({ children }: Props) => {
  const { token } = useAuth();
  
  const wholeState = useSelector((state: any) => state);
  console.log("wholeStateShop", wholeState);
  const role = useSelector(
    (state: any) => state.auth.user?.role,
  );
  const shop = useSelector(
    (state: any) => state.shop.shop,
  );
  const isFetched = useSelector((state: any) => state.shop.isFetched);
  const isChecking = token && role === "seller" && !isFetched;
  const userId = useSelector(
    (state: any) => state.auth.user?._id,
  );
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (role !== "seller") {
    return <Navigate to="/home" replace />;
  }
  if (isChecking) {
    return <div>Checking shop...</div>;
  }
  if (!shop || shop.owner !== userId) {
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
