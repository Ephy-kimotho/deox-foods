import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useToken } from "./AuthProvider";
import axios from "axios";
import { BounceLoader } from "react-spinners";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useToken();

  const getRestaurants = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "http://127.0.0.1:8000/restaurant/api/restaurants/",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      setRestaurants(data);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  if (isLoading) {
    return (
      <div className="p-6 bg-zinc-200 dark:bg-night-200 min-h-screen flex-grow flex   flex-col items-center justify-center">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 mt-20  text-gray-700 dark:text-gray-300 font-sans">
          Loading Restaurants...
        </p>
        <BounceLoader size={50} color="#f57710" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-zinc-200 dark:bg-night-200 min-h-screen flex-grow">
      {/* Available Restaurants */}
      <h2 className="text-3xl font-bold mt-20 mb-2 text-center text-gray-700 dark:text-orange-300 tracking-wider">
        Available Restaurants
      </h2>
      <p className="text-center mb-6 text-base sm:text-lg text-gray-600 dark:text-gray-500 font-semibold">
        Click a restaurant to view it&apos;s menu.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <Link to={`/restaurants/${restaurant.name}`} key={restaurant.id}>
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow pb-2 hover:scale-105">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-700  uppercase tracking-wide">
                  {restaurant.name}
                </h2>
                <p className="text-sm text-gray-600 my-1">
                  {restaurant.description}
                </p>
                <p className="text-sm">
                  Location: &nbsp;
                  <span className="font-medium">{restaurant.location}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
