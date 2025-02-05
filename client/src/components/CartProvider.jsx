/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState, useEffect } from "react";
const cartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [numOfItems, setNumOfItems] = useState(0);

  useEffect(() => {
    const count = cart?.cart_items?.reduce((sum, item) => {
      return (sum += item.quantity);
    }, 0);

    setNumOfItems(count);
  }, [cart]);

  return (
    <cartContext.Provider value={{ cart, numOfItems, setCart }}>
      {children}
    </cartContext.Provider>
  );
}

export const useCart = () => useContext(cartContext);

export default CartProvider;
