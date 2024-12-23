import useCartStore from "../stores/useCartStore";
import Button from "./common/Button";
import CartProduct from "./common/CartProduct";

function Cart() {
  const cart = useCartStore((state) => state.cart);

  const Subtotal = cart.reduce((sum, item) => {
    sum += item.quantity * item.price;
    return sum;
  }, 0);
  const deliveryFee = 20;
  const total = deliveryFee + Subtotal;

  const cartHasItems = cart?.length > 0;

  return (
    <section className="bg-white p-4 flex flex-col mt-20 mb-5">
      <header className="py-1 border-b-2 border-gray-500 font-openSans mb-6">
        <h2 className="text-orange-300 text-3xl font-bold">My Cart</h2>
      </header>

      <main className="flex-grow">
        {cartHasItems ? (
          cart.map((item) => <CartProduct {...item} key={item.id} />)
        ) : (
          <h2 className="text-orange-300 text-xl font-bold">Cart is empty.</h2>
        )}
      </main>

      <footer className="mt-10" >
        <ul className="list-none font-openSans">
          <li className="flex justify-between items-center py-2 border-b-2 border-gray-600">
            <span className="font-bold">Subtotal</span>
            <span>Ksh. ${Subtotal}</span>
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
          <Button onClick={() => console.log("Order posted")}>
            Confirm order
          </Button>
        </div>
      </footer>
    </section>
  );
}

export default Cart;
