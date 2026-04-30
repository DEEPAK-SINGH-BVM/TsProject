import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export const SellerShopGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { role } = useAuth();
  const shop = useSelector((state: any) => state.auth.shop);
  console.log("sellerShopGuard", shop);

  if (role === "seller" && shop === null) {
    return <Navigate to="/seller/create-shop" replace />;
  }
  return children;
};
