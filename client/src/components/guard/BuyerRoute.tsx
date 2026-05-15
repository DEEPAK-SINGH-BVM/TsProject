import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode;
}

const BuyerRoute = ({ children }: Props) => {
  const { token } = useAuth();

  const role = useSelector(
    (state: any) => state.auth.user?.role,
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "buyer") {
    return (
      <Navigate
        to="/seller/dashboard"
        replace
      />
    );
  }

  return children;
};

export default BuyerRoute;