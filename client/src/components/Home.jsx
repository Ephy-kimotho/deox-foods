import SearchSection from "./SearchSection";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/utils";
import axios from "axios";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRestaurants = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/restaurant/restaurants/`);
      const data = res.data.map((item) => ({
        id: item.id,
        picture: item.picture,
        name: item.name,
      }));
      setRestaurants(data);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  return (
    <section className="min-h-screen flex-grow relative bg-zinc-200 dark:bg-night-200 p-4">
      <SearchSection />
      <div className="py-4 mt-10 mb-8 bg-gray-200  rounded-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4">
          Nearby Restaurants
        </h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <p className="text-night-200 text-center font-bold text-lg sm:text-2xl">
              Loading Images...
            </p>
          ) : (
            restaurants.map((restaurant) => (
              <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
                <div className="flex justify-center">
                  <img
                    src={restaurant.picture}
                    alt={restaurant.name}
                    className="rounded-lg w-11/12  sm:h-36 sm:w-36 md:w-64 md:h-56 object-cover"
                  />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
