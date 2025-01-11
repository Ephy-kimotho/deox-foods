/* eslint-disable react/prop-types */
import { useContext } from "react";
import { authContext } from "../AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(authContext);
  const { pathname } = useLocation();

  return !isAuthenticated ? (
    <Navigate to="/login" state={{ redirectTo: pathname }} />
  ) : (
    children
  );
}

export default ProtectedRoute;
