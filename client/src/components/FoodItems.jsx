import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import useCartStore from "../stores/useCartStore";


const hotels = [
  "NAKSHI HOTEL",
  "GOLDEN FRIES",
  "1960 HOTEL",
  "MAGGY'S HOTEL",
];



function FoodItemsPage() {
  const { hotelId } = useParams();
  const addItemToCart = useCartStore((state) => state.addItemToCart);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHotel, setSelectedHotel] = useState("");
  const [filteredMeals, setFilteredMeals] = useState(meals);

  // Sync selectedHotel with URL
  useEffect(() => {
    setSelectedHotel(hotelId || "");
  }, [hotelId]);

  // Filter meals whenever search term or selected hotel changes

  useEffect(() => {
    filterMeals(searchTerm, selectedHotel);
  }, [searchTerm, selectedHotel]);


  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  // Handle hotel filter and update URL
  const handleHotelFilter = (e) => {
    const hotel = e.target.value.trim();

    if (hotel === "") {
      setSelectedHotel("");
      setFilteredMeals(meals);
      navigate("/food-menu/:hotelId");
    } else {
      setSelectedHotel(hotel);
      navigate(`/food-menu/${hotel}`);
    }
  };

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

  const handleAddToCart = (meal, id) => {
    addToCart(meal, id);
    toast.success(`${meal.name} added to cart`);
  };

  return (

    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 p-5 mt-20">
      <Toaster position="top-center" />
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Food Menu
        </h1>

        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-full sm:w-1/2 flex items-center">
            <input
              type="text"
              placeholder="Search for a meal..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 rounded-md bg-gray-100 dark:bg-night-300 text-night-200 focus:outline-none placeholder:text-gray-600"

            />
          </div>
          <div className="w-full sm:w-1/3 flex justify-end">
            <select
              value={selectedHotel}
              onChange={handleHotelFilter}
              className="p-3 rounded-md bg-gray-100 dark:bg-night-300 text-night-200 focus:outline-none w-full sm:w-1/2"
            >
              <option value="">Filter by hotel</option>
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

                  className="w-full h-56 object-cover rounded-md"
                />
                <h3 className="text-xl capitalize font-semibold text-night-200 my-2">
                  {meal.name}
                </h3>
                <p className="text-sm text-night-400 dark:text-night-200 ">
                  {meal.description}
                </p>
                <p className="text-lg font-semibold text-night-200 my-1 ">
                  Ksh {meal.price.toFixed(2)}
                </p>
                <p className="text-sm text-night-400 dark:text-night-200">
                  {meal.hotel}
                </p>
                <button
                  onClick={() => addItemToCart(meal, meal.id)}
                  className="mt-4 inline-block bg-orange-200 text-white py-2 px-4 rounded-lg hover:bg-orange-300 transition-colors"
                >
                  Add to Cart
                </button>
              </div>

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
