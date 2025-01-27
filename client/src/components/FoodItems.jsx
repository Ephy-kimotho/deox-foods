import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { IoArrowBackCircle } from "react-icons/io5";
import { useToken } from "./AuthProvider";
import { postItemToCart, getCartItems } from "../utils/utils";
import { useCart } from "./CartProvider";
import axios from "axios";

function FoodItemsPage() {
  const { hotelId } = useParams();
  const { token } = useToken();
  const { setCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [allMeals, setAllMeals] = useState([]);
  const navigate = useNavigate();

  // Get all restaurants to be used in the select element
  useEffect(() => {
    async function getRestaurants() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/restaurant/api/restaurants/",
          {
            headers: {
              Authorization: `Bearer ${token.trim()}`,
            },
          }
        );

        const restaurants = res.data.map((item) => item.name);
        setHotels(restaurants);
      } catch (error) {
        console.error("Error fetching hotels: ", error);
      }
    }
    getRestaurants();
  }, [token]);

  // Sync selectedHotel with URL
  useEffect(() => {
    setSelectedHotel(hotelId);
  }, [hotelId]);

  // Get all products associated to particular hotel
  useEffect(() => {
    async function getHotelMeals() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/restaurant/restaurant-products/${hotelId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const data = res.data.map((item) => ({
          ...item,
          product_image: `http://127.0.0.1:8000/${item.product_image}`,
        }));
        setAllMeals(data);
      } catch (error) {
        const errorMessage = error.response.data.detail;
        toast.error(errorMessage);
      }
    }
    getHotelMeals();
  }, [hotelId, token]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.trim());
  };

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

  // Fucntion to generate the FoodItems
  const generateFoodItems = (meals, term = "") => {
    const filteredMeals = term
      ? meals.filter((meal) =>
          meal.product_name.toLowerCase().includes(term.toLocaleLowerCase())
        )
      : meals;

    return filteredMeals.length > 0 ? (
      filteredMeals.map((meal) => {
        return (
          <div
            key={meal.id}
            className="bg-zinc-100  p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={meal.product_image}
              alt={meal.product_name}
              className="w-full h-56 object-cover rounded-md"
            />
            <h3 className="text-xl capitalize font-semibold text-night-200 my-2">
              {meal.product_name}
            </h3>
            <p className="text-sm text-night-400 dark:text-night-200 capitalize">
              {meal.category}
            </p>
            <p className="text-sm text-night-400 dark:text-night-200 mt-1">
              {meal.description}
            </p>
            <p className="text-lg font-semibold text-night-200 my-1 ">
              Ksh {Number(meal.product_price).toFixed(2)}
            </p>

            <div className="flex gap-3 items-center">
               {/* <Link
                to={`${meal.id}`}
                className="mt-4 inline-block bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-800 transition-colors"
              >
                View details
              </Link> */}
              <button
                onClick={() => addItem(meal.id)}
                className="mt-4 inline-block bg-orange-200 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })
    ) : (
      <p className="col-span-full text-center text-gray-800 dark:text-white">
        No meals found.
      </p>
    );
  };

  // Handle hotel filter and update URL
  const handleHotelFilter = (e) => {
    const hotel = e.target.value.trim();

    if (hotel === "") {
      setSelectedHotel("");
    } else {
      setSelectedHotel(hotel);
      navigate(`/restaurants/${hotel}`);
    }
  };

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 p-5 mt-20 pb-6">
      <Toaster position="top-center" />
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2 sm:m-0">
          {hotelId}&apos;s Menu
        </h2>

        <Link
          to="../"
          relative="path"
          className="flex gap-1 items-center mb-2 text-lg text-night-100 hover:text-orange-200 max-w-32 dark:text-gray-300 dark:hover:text-orange-200"
        >
          <IoArrowBackCircle />
          Back
        </Link>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center mb-6">
          <div className="w-full sm:w-1/2 flex items-center">
            <input
              type="text"
              placeholder="Search for a meal..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 rounded-md bg-gray-100 dark:bg-night-300 text-night-200 focus:outline-none placeholder:text-gray-600"
            />
          </div>
          <div className="w-full sm:w-1/2 flex justify-end">
            <select
              value={selectedHotel}
              onChange={handleHotelFilter}
              className="p-3 rounded-md bg-gray-100 dark:bg-night-300 text-night-200 focus:outline-none w-full sm:w-1/2"
            >
              <option value="" disabled>
                Filter by hotel
              </option>
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
          {generateFoodItems(allMeals, searchTerm)}
        </motion.div>
      </div>
    </section>
  );
}

export default FoodItemsPage;
