import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

// import type React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store/store";
// import Layout from "./layout/layout";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { isAuthenticated, loading } = useSelector(
//     (state: RootState) => state.auth
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <Layout>{children}</Layout>;
// };

// export default ProtectedRoute;

// import type React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store/store";
// import Layout from "./layout/layout";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { isAuthenticated, loading } = useSelector(
//     (state: RootState) => state.auth
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <Layout>{children}</Layout>;
// };

// export default ProtectedRoute;
