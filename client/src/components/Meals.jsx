import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "./CartProvider";
import { getCartItems, postItemToCart } from "../utils/utils";
import { useToken } from "./AuthProvider";
import { ArrowLeftCircle } from "lucide-react";

const Meals = () => {
  const { state } = useLocation();
  const { hotelId } = useParams();
  const { setCart, cart } = useCart();
  const { token } = useToken();
  const navigate = useNavigate();
  const meal = state?.meal;

  // verify add Item function
  const verifyAdd = (id) => {
    // check if a user is authenticated
    if (!token) {
      toast("You have to login first.");
      navigate("/login", { state: { redirectTo: `/restaurants/${hotelId}` } });
    } else {
      const isItemInCart = cart?.cart_items?.some(
        (item) => item.product === id
      );
      if (isItemInCart) {
        toast("Item is already in cart.");
      } else {
        addItem(id);
      }
    }
  };

  // Add item to cart function
  const addItem = async (id) => {
    try {
      const res = await postItemToCart(Number(id), token);

      if (res.statusText === "Created") {
        toast.success("Item added to cart.");
      }

      const items = await getCartItems(token);
      setCart(items);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  /* EARLY RETURN IF MEAL IS NOT FOUND */
  if (!meal) {
    return (
      <div className="flex flex-grow justify-center items-center min-h-screen bg-zinc-200 dark:bg-night-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Meal not found
        </h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-zinc-200 dark:bg-night-200 flex flex-col items-center justify-center  w-full mt-20">
      <Toaster position="top-center" />
      <div className="w-full max-w-7xl p-6 rounded-xl ">
        <Link
          to="../"
          relative="path"
          className="flex gap-1 items-center mb-2 text-lg text-night-100 hover:text-orange-200 max-w-32 dark:text-gray-300 dark:hover:text-orange-200"
        >
          <ArrowLeftCircle size={22} strokeWidth={2.25} />
          Back
        </Link>
        {/* Meal Details */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Meal Image */}
          <img
            src={meal.product_image}
            alt={meal.product_name}
            className="h-[400px] rounded-md  aspect-square justify-self-center"
          />

          {/* Meal Information */}
          <div className="flex flex-col justify-center space-y-6 bg-zinc-100 px-6 rounded-lg shadow-lg py-6">
            <div>
              <h1 className="text-4xl font-semibold text-gray-800  capitalize">
                {meal.product_name}
              </h1>
              <p className="text-lg text-gray-600 mt-2 mb-5">
                ksh: {meal.product_price}
              </p>
              <p className="text-lg text-gray-600">{meal.description}</p>
            </div>

            {/* Nutritional Information */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-red-500 text-lg">🔥</span>
                <p className="text-gray-800 ">{meal.kilocalories} kcal</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 text-lg">🍗</span>
                <p className="text-gray-800 ">{meal.proteins}g Protein</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-orange-500 text-lg">🥑</span>
                <p className="text-gray-800 ">{meal.fats}g Fat</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-lg">🍞</span>
                <p className="text-gray-800 ">{meal.carbohydrates}g Carbs</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between space-x-4">
              <button
                onClick={() => verifyAdd(meal.id)}
                className="bg-green-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-colors transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Meals;
