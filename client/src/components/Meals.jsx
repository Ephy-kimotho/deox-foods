import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { meals } from "../data";
import useCartStore from "../stores/useCartStore";
import toast from "react-hot-toast";

// Sample meals data with ratings and nutritional info
/* const meals = [
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Delicious pizza with fresh mozzarella",
    price: 12.99,
    calories: 250,
    protein: 12,
    fat: 10,
    carbs: 30,
    rating: 4.5,
    image: "https://via.placeholder.com/600x400?text=Pizza+Margherita",
    quantity: 1,
  },
  {
    id: 2,
    name: "Burger",
    description: "Juicy beef burger with fries",
    price: 8.99,
    calories: 450,
    protein: 20,
    fat: 25,
    carbs: 40,
    rating: 4.0,
    image: "https://via.placeholder.com/600x400?text=Burger",
    quantity: 1,
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    description: "Creamy pasta with parmesan cheese",
    price: 14.99,
    calories: 600,
    protein: 15,
    fat: 20,
    carbs: 50,
    rating: 4.7,
    image: "https://via.placeholder.com/600x400?text=Pasta+Alfredo",
    quantity: 1,
  },
  {
    id: 4,
    name: "Sushi",
    description: "Fresh sushi with tuna and salmon",
    price: 18.99,
    calories: 350,
    protein: 25,
    fat: 5,
    carbs: 20,
    rating: 4.9,
    image: "https://via.placeholder.com/600x400?text=Sushi",
    quantity: 1,
  },
]; */

const Meals = () => {
  const { mealId } = useParams();
  const addToCart = useCartStore((state) => state.addItemToCart);

  const meal = meals.find((meal) => meal.id === parseInt(mealId));
  const relatedMeals = meals.filter(
    (m) => m.id !== parseInt(mealId) && Math.floor(Math.random() * 20) <= 4
  );

  /* EARLY RETURN IF MEAL IS NOT FOUND */
  if (!meal) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-200 dark:bg-night-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Meal not found
        </h1>
      </div>
    );
  }

  /* Add  item to cart logic */
  const handleAddToCart = () => {
    addToCart(meal, meal.id);
    toast.success(`${meal.name} added to cart`);
  };

  // TODO: yet to add functionality for quick buy
 /*  const handleQuickBuy = () => {
    toast.success(`Quick Buy: ${meal.name}`);
    // Add logic for direct checkout
  }; */

  //TODO: yet to add dark mode functionality
  return (
    <section className="min-h-screen bg-zinc-200 dark:bg-night-200 flex flex-col items-center justify-center  w-full mt-20">
      <div className="w-full max-w-7xl p-6 rounded-xl ">
        {/* Meal Details */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Meal Image */}
          <img
            src={meal.image}
            alt={meal.name}
            className="h-[400px] rounded-md  aspect-square justify-self-center"
            
          />

          {/* Meal Information */}
          <div className="flex flex-col justify-center space-y-6 bg-zinc-100 px-6 rounded-lg shadow-lg py-6">
            <h1 className="text-4xl font-semibold text-gray-800  capitalize">
              {meal.name}
            </h1>
            <p className="text-lg text-gray-600">{meal.description}</p>

            {/* User Ratings */}
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 text-xl">⭐</span>
              <p className="text-gray-800 ">{meal.rating.toFixed(1)} / 5.0</p>
            </div>

            {/* Nutritional Information */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-red-500 text-lg">🔥</span>
                <p className="text-gray-800 ">{meal.calories} kcal</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 text-lg">🍗</span>
                <p className="text-gray-800 ">{meal.protein}g Protein</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-orange-500 text-lg">🥑</span>
                <p className="text-gray-800 ">{meal.fat}g Fat</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500 text-lg">🍞</span>
                <p className="text-gray-800 ">{meal.carbs}g Carbs</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between space-x-4">
              <button
                onClick={handleAddToCart}
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

        {/* Related Meals */}
        <div className="bg-white dark:bg-night-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800  mb-4">
            Related Meals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedMeals.map((relatedMeal) => (
              <div
                key={relatedMeal.id}
                className="flex flex-col items-center bg-zinc-100 dark:bg-night-600 p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform"
              >
                <img
                  src={relatedMeal.image}
                  alt={relatedMeal.name}
                  className="w-full h-64 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-medium text-gray-800  capitalize">
                  {relatedMeal.name}
                </h3>
                <p className="text-gray-800  my-1">
                  Ksh {relatedMeal.price.toFixed(2)}
                </p>
                <p className="text-gray-600">{relatedMeal.hotel}</p>
                <Link
                  to={`/restaurants/${relatedMeal.hotel}/${relatedMeal.id}`}
                  className="mt-3 bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Meals;
