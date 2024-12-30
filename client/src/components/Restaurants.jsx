import { restaurants } from "../data";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6 bg-zinc-200 dark:bg-night-200 min-h-screen flex-grow">
      {/* Available Restaurants */}
      <h2 className="text-3xl font-bold mb-8 mt-20 text-center text-gray-700 dark:text-orange-300">
        Available Restaurants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-700">
                {restaurant.name}
              </h2>
              <p className="text-sm text-gray-600">{restaurant.description}</p>
              <p className="text-sm">
                Rating:{" "}
                <span className="font-medium">{restaurant.rating}⭐</span>
              </p>
              <p className="text-sm">
                Location:{" "}
                <span className="font-medium">{restaurant.location}</span>
              </p>
              {/* For the FRUITS PAGE, navigate to the /fruits page */}
              {restaurant.name === "FRUITS PAGE" ? (
                <Link
                  to="/fruits"
                  className="mt-4 bg-orange-300 text-white px-4 py-2 rounded-md hover:bg-orange-600 inline-block"
                >
                  Order Now
                </Link>
              ) : (
                // For other restaurants, navigate to the filtered food menu page
                <Link
                  to={`/food-menu/${restaurant.name}`} // Dynamically pass restaurant ID in URL
                  className="mt-4 bg-orange-300 text-white px-4 py-2 rounded-md hover:bg-orange-600 inline-block"
                >
                  Order Now
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

