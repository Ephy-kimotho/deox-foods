/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const authContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signup = () => setIsAuthenticated(true);

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    setIsAuthenticated(false);
  };

  const auth = {
    isAuthenticated,
    signup,
    login,
    logout,
  };

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default AuthProvider;
