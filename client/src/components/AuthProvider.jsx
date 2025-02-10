/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

export const authContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState("");

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;

/* Custom hook that allows you to access token and setToken */
export const useToken = () => {
  return useContext(authContext);
};
