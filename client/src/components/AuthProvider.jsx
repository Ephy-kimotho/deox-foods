/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

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

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token); // decode JWT
      const expirationTime = decodedToken.exp * 1000; // convert exp time to ms
      const delay = expirationTime - Date.now(); // get the delay to expiration

      if (delay <= 0) {
        window.location.href = "/login";
      } else {
        const timerId = setTimeout(() => {
          window.location.href = "/login";
        }, delay);
        return () => clearTimeout(timerId);
      }
    } catch (error) {
      console.error("Error decoding JWT", error);
      window.location.href = "/login";
    }
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
