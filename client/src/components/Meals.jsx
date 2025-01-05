import { useParams } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

// Sample meals data with calories
const meals = [
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Delicious pizza with fresh mozzarella",
    price: 12.99,
    calories: 250,
    image: "https://via.placeholder.com/600x400?text=Pizza+Margherita",
    quantity: 1,
  },
  {
    id: 2,
    name: "Burger",
    description: "Juicy beef burger with fries",
    price: 8.99,
    calories: 450,
    image: "https://via.placeholder.com/600x400?text=Burger",
    quantity: 1,
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    description: "Creamy pasta with parmesan cheese",
    price: 14.99,
    calories: 600,
    image: "https://via.placeholder.com/600x400?text=Pasta+Alfredo",
    quantity: 1,
  },
  {
    id: 4,
    name: "Sushi",
    description: "Fresh sushi with tuna and salmon",
    price: 18.99,
    calories: 350,
    image: "https://via.placeholder.com/600x400?text=Sushi",
    quantity: 1,
  },
];

const Meals = () => {
  const { mealid } = useParams();
  const meal = meals.find((meal) => meal.id === parseInt(mealid));

  if (!meal) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-200 dark:bg-night-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Meal not found
        </h1>
      </div>
    );
  }

  const addToCart = useCartStore((state) => state.addItemToCart);

  const handleAddToCart = () => {
    addToCart(meal, meal.id);
    toast.success(`${meal.name} added to cart`);
  };

  return (
    <section className="min-h-screen bg-zinc-200 dark:bg-night-200 flex items-center justify-center p-5 w-full">
      <Toaster position="top-center" />
      <div className="w-full max-w-7xl bg-transparent p-8 rounded-xl shadow-lg">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Meal Image */}
          <div className="flex justify-center items-center mb-8 lg:mb-0 relative">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-auto max-w-lg rounded-lg shadow-lg object-cover opacity-70"
            />
          </div>

          {/* Meal Details */}
          <div className="flex flex-col justify-center space-y-6 bg-white dark:bg-night-200 bg-opacity-90 dark: text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white mb-4">{meal.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{meal.description}</p>
            <div className="flex items-center justify-between space-x-4">
              <p className="text-3xl font-semibold text-gray-800 dark:text-white">${meal.price.toFixed(2)}</p>
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-colors transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
              <strong>Calories:</strong> {meal.calories} kcal
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Meals;

