import { create } from "zustand";
const useCartStore = create((set) => ({
  cart: [],

  /* Methods that work on cart */
  addItemToCart: (item, id) => {
    return set((prevState) => {
      let updatedArray = prevState.cart.slice(0);
      const foundItem = updatedArray.find((item) => item.id === id);

      if (foundItem) {
        foundItem.quantity++;
        return { cart: updatedArray };
      } else {
        return { cart: [...updatedArray, item] };
      }
    });
  },
  removeItemFromCart: (itemId) =>
    set((prevState) => {
      const updatedCart = prevState.cart.reduce((acc, item) => {
        if (item.id !== itemId) {
          acc.push(item);
        } else {
          item.quantity = 1;
        }
        return acc;
      }, []);

      return { cart: updatedCart };
    }),
  changeQuantity: (action, id) =>
    set((prevState) => {
      const updatedCart = prevState.cart.map((item) => {
        if (item.id === id) {
          if (action === "plus") {
            item.quantity++;
          } else if (action === "minus" && item.quantity > 1) {
            item.quantity--;
          }
        }
        return item;
      });
      return { cart: updatedCart };
    }),

  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
