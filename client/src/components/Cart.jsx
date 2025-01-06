import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authContext } from "./AuthProvider";
import useCartStore from "../stores/useCartStore";
import Button from "./common/Button";
import CartProduct from "./common/CartProduct";
import Checkout from "./Checkout";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const [showCheckout, setShowCheckOut] = useState(false);
  const { isAuthenticated } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  const Subtotal = cart.reduce((sum, item) => {
    sum += item.quantity * item.price;
    return sum;
  }, 0);
  const deliveryFee = 20;
  const total = deliveryFee + Subtotal;

  const cartHasItems = cart?.length > 0;

  const displayCheckout = () => {
    if (isAuthenticated) {
      if (cartHasItems) {
        setShowCheckOut(true);
      } else {
        alert("Cart is empty");
      }
    } else {
      navigate("/login?message=You must login first to confirm order.", {
        state: { redirectTo: location.pathname },
      });
    }
  };

  const closeCheckout = () => {
    setShowCheckOut(false);
  };

  return (
    <section className="flex-grow min-h-screen py-4 bg-zinc-200 dark:bg-night-200 px-6 relative">
      <header className="py-2 mt-20 mb-4 font-openSans  border-b-2 border-gray-600">
        <h2 className="text-orange-300 text-3xl font-bold">My Cart</h2>
      </header>

      <div className="flex-grow">
        {cartHasItems ? (
          cart.map((item) => <CartProduct {...item} key={item.id} />)
        ) : (
          <h2 className="text-orange-300 text-xl font-bold">Cart is empty.</h2>
        )}
      </div>

      <footer className="mt-10">
        <ul className="list-none font-openSans dark:text-gray-200">
          <li className="flex justify-between items-center py-2 border-b-2 border-gray-600">
            <span className="font-bold">Subtotal</span>
            <span>Ksh. {Subtotal}</span>
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
            moreStyles="bg-orange-300 hover:bg-orange-600"
          >
            Confirm order
          </Button>
        </div>
      </footer>

      {showCheckout && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white px-6  py-6 pb-10 rounded-md shadow-lg w-full max-w-2xl">
            <Checkout closeCheckout={closeCheckout} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
