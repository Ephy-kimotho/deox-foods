/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";

export const authContext = createContext();

/* Lazy state initialization function */
const getInitialToken = () =>
  JSON.parse(localStorage.getItem("authToken")) || "";

function AuthProvider({ children }) {
  const [token, setToken] = useState(getInitialToken);

  /* Whenever the token changes update local storage.*/
  useEffect(() => {
    localStorage.setItem("authToken", JSON.stringify(token));
  }, [token]);

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
