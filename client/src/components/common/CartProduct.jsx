/* eslint-disable react/prop-types */
import useCartStore from "../../stores/useCartStore";
import { FaRegTrashCan } from "react-icons/fa6";

function CartProduct({ id, name, image, description, price, quantity }) {
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
  const changeQuantity = useCartStore((state) => state.changeQuantity);

  return (
    <article className="bg-white flex justify-between shadow-lg w-full py-2 px-2 rounded-md mb-4">
      <div className="flex-grow flex gap-2 ">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-md object-cover"
        />

        <div className="space-y-1 font-openSans">
          <h3 className="text-lg text-night-100 font-bold capitalize">
            {name}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="font-bold text-orange-300">Ksh. {price}</p>
        </div>
      </div>

      <div className="w-100 sm:w-1/6 flex flex-col justify-around text-right">
        <button
          onClick={() => removeItemFromCart(id)}
          className="text-black hover:text-red-100 text-lg ml-auto font-normal"
        >
          <FaRegTrashCan />
        </button>

        <div className="space-x-2">
          <button
            onClick={() => changeQuantity("minus", id)}
            className="border-2 w-6 sm:w-1/3 lg:text-xl lg:font-bold text-center border-orange-300 bg-white text-orange-300 rounded-md"
          >
            -
          </button>
          <span className="font-bold text-night-100">{quantity}</span>
          <button
            onClick={() => changeQuantity("plus", id)}
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
