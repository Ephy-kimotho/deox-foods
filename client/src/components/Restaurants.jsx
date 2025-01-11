import { restaurants } from "../data";
import { Link } from "react-router-dom";

const Restaurants = () => {
  return (
    <div className="p-6 bg-zinc-200 dark:bg-night-200 min-h-screen flex-grow">
      {/* Available Restaurants */}
      <h2 className="text-3xl font-bold mb-8 mt-20 text-center text-gray-700 dark:text-orange-300">
        Available Restaurants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <Link to={`/food-menu/${restaurant.name}`} key={restaurant.id}>
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow pb-2 hover:scale-105">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  {restaurant.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {restaurant.description}
                </p>
                <p className="text-sm">
                  Rating:&nbsp;
                  <span className="font-medium my-2">{restaurant.rating}⭐</span>
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
