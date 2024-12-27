import { restaurants } from "../data";

const Home = () => {
  return (
    <div className="p-6 bg-zinc-200 dark:bg-night-200 min-h-screen flex-grow">
      {/* Available Restaurants */}
      <h2 className="text-3xl font-bold mb-8 mt-20 text-center text-[#2C3E50] dark:text-orange-300">
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
              <h2 className="text-lg font-semibold text-[#2C3E50]">
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
              {restaurant.name === "FRUITS PAGE" ? (
                <button
                  onClick={() => (window.location.href = "/fruits")}
                  className="mt-4 bg-[#FD661D] text-white px-4 py-2 rounded-md hover:bg-[#e85c1a]"
                >
                  Order Now
                </button>
              ) : (
                <button className="mt-4 bg-[#FD661D] text-white px-4 py-2 rounded-md hover:bg-[#e85c1a]">
                  Order Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
