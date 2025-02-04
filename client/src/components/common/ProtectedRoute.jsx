/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useToken } from "../AuthProvider"; 

function ProtectedRoute({ children }) {
  const { token } = useToken()
  const { pathname } = useLocation();

  return !token ? (
    <Navigate to="/login" state={{ redirectTo: pathname }} replace />
  ) : (
    children
  );
}

export default ProtectedRoute;
