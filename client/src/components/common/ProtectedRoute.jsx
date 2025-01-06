/* eslint-disable react/prop-types */
import { useContext } from "react";
import { authContext } from "../AuthProvider";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(authContext);

  return !isAuthenticated ? <Navigate to="/login" replace={true} /> : children;
}

export default ProtectedRoute;
