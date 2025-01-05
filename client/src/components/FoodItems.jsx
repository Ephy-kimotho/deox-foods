import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import useCartStore from "../stores/useCartStore";

const hotels = [
  "NAKSHI HOTEL",
  "GOLDEN FRIES",
  "1960 HOTEL",
  "MAGGY'S HOTEL",
];

const meals = [
  {
    id: 1,
    name: "Pizza Margherita",
    hotel: "NAKSHI HOTEL",
    description: "Delicious pizza with fresh mozzarella",
    price: 12.99,
    image: "https://via.placeholder.com/150?text=Pizza+Margherita",
  },
  {
    id: 2,
    name: "Burger",
    hotel: "GOLDEN FRIES",
    description: "Juicy beef burger with fries",
    price: 8.99,
    image: "https://via.placeholder.com/150?text=Burger",
  },
  {
    id: 3,
    name: "Pasta Alfredo",
    hotel: "1960 HOTEL",
    description: "Creamy pasta with parmesan cheese",
    price: 14.99,
    image: "https://via.placeholder.com/150?text=Pasta+Alfredo",
  },
  {
    id: 4,
    name: "Sushi",
    hotel: "MAGGY'S HOTEL",
    description: "Fresh sushi with tuna and salmon",
    price: 18.99,
    image: "https://via.placeholder.com/150?text=Sushi",
  },
];

function FoodItemsPage() {
  const { hotelId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(hotelId || "");
  const [filteredMeals, setFilteredMeals] = useState(meals);

  const addToCart = useCartStore((state) => state.addItemToCart);

  useEffect(() => {
    filterMeals(searchTerm, selectedHotel);
  }, [searchTerm, selectedHotel]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleHotelFilter = (e) => setSelectedHotel(e.target.value);

  const filterMeals = (search, hotel) => {
    let filtered = meals;
    if (search) {
      filtered = filtered.filter((meal) =>
        meal.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (hotel) {
      filtered = filtered.filter((meal) => meal.hotel === hotel);
    }
    setFilteredMeals(filtered);
  };

  const handleAddToCart = (meal) => {
    addToCart({ ...meal, quantity: 1 });
    toast.success(`${meal.name} added to cart`);
  };

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 p-5">
      <Toaster position="top-center" />
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Food Menu
        </h1>

        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search for a meal..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none"
            />
          </div>
          <div className="w-full sm:w-1/3 flex justify-end">
            <select
              value={selectedHotel}
              onChange={handleHotelFilter}
              className="p-3 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none"
            >
              <option value="">All Hotels</option>
              {hotels.map((hotel) => (
                <option key={hotel} value={hotel}>
                  {hotel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Food Items List */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <motion.div
                key={meal.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {meal.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {meal.description}
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white mt-4">
                  ${meal.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {meal.hotel}
                </p>
                <div className="flex mt-4">
                  <Link
                    to={`/meal/${meal.id}`}
                    className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleAddToCart(meal)}
                    className="ml-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-800 dark:text-white">
              No meals found.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default FoodItemsPage;

