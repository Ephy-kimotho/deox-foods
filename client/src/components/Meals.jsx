import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "./CartProvider";
import { getCartItems, postItemToCart } from "../utils/utils";
import { useToken } from "./AuthProvider";
import { IoArrowBackCircle } from "react-icons/io5";

const Meals = () => {
  const { state } = useLocation();
  const { setCart } = useCart();
  const { token } = useToken();
  const meal = state?.meal;

  // Add item to cart
  const addItem = async (id) => {
    try {
      const message = await postItemToCart(id, token);
      toast.success(message);

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
          <IoArrowBackCircle />
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
            <h1 className="text-4xl font-semibold text-gray-800  capitalize">
              {meal.product_name}
            </h1>
            <p className="text-lg text-gray-600">{meal.description}</p>

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
                onClick={() => addItem(meal.id)}
                className="bg-green-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-colors transform hover:scale-105"
              >
                Add to Cart
              </button>
              {/*  <button
                onClick={handleQuickBuy}
                className="bg-blue-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition-colors transform hover:scale-105"
              >
                Quick Buy
              </button> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Meals;
