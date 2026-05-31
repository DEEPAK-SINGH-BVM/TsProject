// import { ReactNode } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";

// interface Props {
//   children: ReactNode;
// }

// const PublicRoute = ({ children }: Props) => {
//   const { token } = useAuth();
//    const role = useSelector(
//     (state:any) => state.auth.user?.role
//   );
//   const shop = useSelector((state: RootState) => state.shop.shop);

//   if (token) {
//     if (role === "seller" && shop) {
//       return <Navigate to="/seller/dashboard" replace />;
//     } else if (role === "seller" && shop === null) {
//       return <Navigate to="/seller/create-shop" replace />;
//     } else {
//       return <Navigate to="/home" replace />;
//     }
//   }
//   return children;
// };
// export default PublicRoute;

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const { token } = useAuth();

  const role = useSelector(
    (state: any) => state.auth.user?.role
  );

  const shop = useSelector(
    (state: RootState) => state.shop.shop
  );

  const loading = useSelector(
    (state: RootState) => state.shop.loading
  );

  if (token && role === "seller" && loading) {
    return <div>Loading...</div>;
  }

  if (token) {
    if (role === "seller") {
      if (shop) {
        return <Navigate to="/seller/dashboard" replace />;
      }

      return <Navigate to="/seller/create-shop" replace />;
    }

    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;