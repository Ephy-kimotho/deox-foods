import { create } from "zustand";
const useCartStore = create((set) => ({
  cart: [
    {
      id: 1,
      name: "chicken curry",
      image: "/src/assets/images/chicken_curry.jpg",
      description: "Tasties chicken curry you can have.",
      price: 120,
      quantity: 1,
    },
    {
      id: 2,
      name: "noodles",
      image: "/src/assets/images/noodles.jpg",
      description: "Tasties noodles you can have.",
      price: 100,
      quantity: 1,
    },
    {
      id: 3,
      name: "ramen",
      image: "/src/assets/images/ramen.jpg",
      description: "Tasties ramen you can have.",
      price: 80,
      quantity: 1,
    },
    {
      id: 4,
      name: "shrimp",
      image: "/src/assets/images/shrimp.jpg",
      description: "Tasties shrimp you can have.",
      price: 80,
      quantity: 1,
    },
  ],

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
}));

export default useCartStore;
