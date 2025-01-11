import SearchSection from "./SearchSection";
import restaurant1 from "../assets/images/restaurant1.jpg";
import restaurant2 from "../assets/images/restaurant2.jpg";
import restaurant3 from "../assets/images/restaurant3.jpg";
import restaurant4 from "../assets/images/restaurant4.jpg";
import restaurant5 from "../assets/images/restaurant5.jpg";

const Home = () => {
  const dummyRestaurants = [
    { id: 1, name: "Restaurant 1", image: restaurant1 },
    { id: 2, name: "Restaurant 2", image: restaurant2 },
    { id: 3, name: "Restaurant 3", image: restaurant3 },
    { id: 4, name: "Restaurant 4", image: restaurant4 },
    { id: 5, name: "Restaurant 5", image: restaurant5 },
  ];

  return (
    <section className="min-h-screen flex-grow relative bg-zinc-200 dark:bg-night-200 p-4">
      <SearchSection />
      <div className="p-4 mt-10 mb-8 bg-gray-200  rounded-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4">
          Nearby Restaurants
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {dummyRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="flex justify-center">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="rounded-lg w-2/3 sm:h-36 sm:w-36 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
