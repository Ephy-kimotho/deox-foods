/* eslint-disable react/prop-types */
import { FaRegTrashCan } from "react-icons/fa6";
import { useToken } from "../AuthProvider";
import { useCart } from "../CartProvider";
import toast from "react-hot-toast";
import axios from "axios";
import {
  removeItemFromCart,
  getCartItems,
  postItemToCart,
} from "../../utils/utils";

function CartProduct({ id, product_name, image, price, quantity }) {
  const { token } = useToken();
  const { setCart } = useCart();

  const addQuantity = async (id) => {
    try {
      const message = await postItemToCart(id, token);
      console.log(message);

      const items = await getCartItems(token);
      setCart(items);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const reduceQuantity = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/restaurant/cart/remove/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      const items = await getCartItems(token);
      setCart(items);
    } catch (error) {
      console.error("Error reducing quantity: ", error);
    }
  };

  const deleteItem = async () => {
    try {
      const message = await removeItemFromCart(id, token);
      toast.success(message);

      const cartItems = await getCartItems(token);
      setCart(cartItems);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <article className="bg-white flex justify-between shadow-lg w-full py-2 px-2 rounded-md mb-4">
      <div className="flex gap-4  pr-8 ">
        <img
          src={image}
          alt={product_name}
          className="w-24 h-24 rounded-md object-cover"
        />

        <div className="font-openSans  flex flex-col justify-center">
          <h3 className="text-lg text-night-100 font-bold capitalize">
            {product_name}
          </h3>
          <p className="font-bold text-orange-300">Ksh. {price}</p>
        </div>
      </div>

      <div className="w-100 sm:w-1/6 flex flex-col justify-around text-right mr-2">
        <button
          onClick={deleteItem}
          className="text-black hover:text-red-100 text-lg ml-auto font-normal"
        >
          <FaRegTrashCan />
        </button>

        <div className="space-x-2">
          <button
            onClick={() => reduceQuantity(id)}
            className="border-2 w-6 sm:w-1/3 lg:text-xl lg:font-bold text-center border-orange-300 bg-white text-orange-300 rounded-md"
          >
            -
          </button>
          <span className="font-bold text-night-100">{quantity}</span>
          <button
            onClick={() => addQuantity(id)}
            className="bg-orange-300 w-6 sm:w-1/3 lg:text-xl lg:font-bold text-center text-white rounded-md"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartProduct;
