import { useState, useEffect } from "react";
import Button from "./common/Button";
import CartProduct from "./common/CartProduct";
import Checkout from "./Checkout";
import { getCartItems } from "../utils/utils";
import { useToken } from "./AuthProvider";
import { useCart } from "./CartProvider";
import toast, { Toaster } from "react-hot-toast";

function Cart() {
  const [showCheckout, setShowCheckOut] = useState(false);
  const [isOrderAllowed, setIsOrderAllowed] = useState(true);
  const { cart, setCart } = useCart();
  const { token } = useToken();

  //GET CART ITEMS TO BE DISPLAYED
  useEffect(() => {
    getCartItems(token).then((items) => {
      setCart(items);
    });
  }, [token, setCart]);

 
  // SIDE EFFECT TO KNOW IF AN ORDER's TIME IS VALID
  /* useEffect(() => {
    const checkOrderTime = () => {
      
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();

     
      const startHour = 11;
      const endHour = 16;

      
      if (currentHour > startHour && currentHour < endHour) {
        setIsOrderAllowed(true);
      } else if (currentHour === startHour && currentMinutes >= 0) {
        setIsOrderAllowed(true);
      } else if (currentHour === endHour && currentMinutes === 0) {
        setIsOrderAllowed(true);
      } else {
        setIsOrderAllowed(false);
      }
    };
    checkOrderTime();

   
    const intervalID = setInterval(checkOrderTime, 3600000);

    return () => clearInterval(intervalID);
  }, []); */

  const cartHasItems = cart?.cart_items?.length > 0;
  const subtotal = cart?.cart_total || 0;
  const deliveryFee = cart?.delivery_fee || 0;
  const total = cart?.total_amount || 0;

  const displayCheckout = () => {
    if (isOrderAllowed) {
      if (cartHasItems) {
        setShowCheckOut(true);
      } else {
        toast("Cart has no items");
      }
    } else {
      toast("Orders are allowed from 11am to 4pm.");
    }
  };

  const closeCheckout = () => {
    setShowCheckOut(false);
  };

  return (
    <section className="flex-grow min-h-screen py-4 bg-zinc-200 dark:bg-night-200 px-2 relative">
      <Toaster position="top-center" />
      <header className="py-2 mt-20 mb-4 font-openSans  border-b-2 border-gray-600">
        <h2 className="text-orange-300 text-3xl font-bold">My Cart</h2>
      </header>

      <div className="flex-grow">
        {cartHasItems ? (
          cart.cart_items.map((item) => <CartProduct {...item} key={item.id} />)
        ) : (
          <h2 className="text-orange-300 text-xl font-bold">Cart is empty.</h2>
        )}
      </div>

      <footer className="mt-10">
        <ul className="list-none font-openSans dark:text-gray-200">
          <li className="flex justify-between items-center py-2 border-b-2 border-gray-600">
            <span className="font-bold">Subtotal</span>
            <span>Ksh. {subtotal}</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b-2 border-gray-600">
            <span className="font-bold">Delivery fee</span>
            <span>Ksh. {deliveryFee}</span>
          </li>
          <li className="flex justify-between items-center py-2 mb-4">
            <span className="font-bold">Total</span>
            <span>Ksh. {total}</span>
          </li>
        </ul>

        <div className="text-center">
          <Button
            onClick={displayCheckout}
            type="button"
            moreStyles="bg-orange-300 hover:bg-orange-600 w-3/5 sm:w-52"
          >
            Confirm order
          </Button>
        </div>
      </footer>

      {showCheckout && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white  rounded-lg shadow-lg w-11/12 p-5 max-w-2xl">
            <Checkout closeCheckout={closeCheckout} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
