import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // For making API requests

const hotels = [
  "NAKSHI HOTEL",
  "GOLDEN FRIES",
  "1960 HOTEL",
  "MAGGY'S HOTEL"
]; // Example hotels for the filter

const meals = [
  { id: 1, name: "Pizza Margherita", hotel: "NAKSHI HOTEL", description: "Delicious pizza with fresh mozzarella", price: 12.99 },
  { id: 2, name: "Burger", hotel: "GOLDEN FRIES", description: "Juicy beef burger with fries", price: 8.99 },
  { id: 3, name: "Pasta Alfredo", hotel: "1960 HOTEL", description: "Creamy pasta with parmesan cheese", price: 14.99 },
  { id: 4, name: "Sushi", hotel: "MAGGY'S HOTEL", description: "Fresh sushi with tuna and salmon", price: 18.99 },
  // Add more meals as needed
];

function FoodItemsPage() {
  const { hotelId } = useParams(); // Get hotel ID from the URL (e.g., /food-menu/:hotelId)
  console.log(hotelId)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(hotelId || "");
  const [filteredMeals, setFilteredMeals] = useState(meals);

  useEffect(() => {
    // Filter meals whenever search term or selected hotel changes
    filterMeals(searchTerm, selectedHotel);
  }, [searchTerm, selectedHotel]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle hotel filter
  const handleHotelFilter = (e) => {
    setSelectedHotel(e.target.value);
  };

  // Filter meals based on search term and selected hotel
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

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 p-5">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-center text-night-200 mb-6">
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
              className="w-full p-3 rounded-md bg-gray-100 dark:bg-night-300 text-night-200 dark:text-white focus:outline-none"
            />
          </div>

          <div className="w-full sm:w-1/3 flex justify-end">
            <select
              value={selectedHotel}
              onChange={handleHotelFilter}
              className="p-3 rounded-md bg-gray-100 dark:bg-night-300 text-night-200 dark:text-white focus:outline-none"
            >
              <option value="">Select Hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel} value={hotel}>
                  {hotel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Food Items List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white dark:bg-night-300 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-night-200 dark:text-white">
                  {meal.name}
                </h3>
                <p className="text-sm text-night-400 dark:text-night-200 mt-2">
                  {meal.description}
                </p>
                <p className="text-lg font-semibold text-night-200 dark:text-white mt-4">
                  ${meal.price.toFixed(2)}
                </p>
                <p className="text-sm text-night-400 dark:text-night-200 mt-1">
                  {meal.hotel}
                </p>
                <Link
                  to={`/meal/${meal.id}`}
                  className="mt-4 inline-block bg-orange-200 text-white py-2 px-4 rounded-lg hover:bg-orange-300 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-night-200 dark:text-white">
              No meals found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default FoodItemsPage;

