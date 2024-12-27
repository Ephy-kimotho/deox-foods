import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import SearchSection from "./SearchSection";
import restaurant1 from "../assets/images/restaurant1.jpg";
import restaurant2 from "../assets/images/restaurant2.jpg";
import restaurant3 from "../assets/images/restaurant3.jpg";
import restaurant4 from "../assets/images/restaurant4.jpg";
import restaurant5 from "../assets/images/restaurant5.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    axios
      .get("/api/restaurants")
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the restaurants!", error);
      });
  }, []);

  // Dummy data for testing
  const dummyRestaurants = [
    { id: 1, name: "Restaurant 1", image: restaurant1 },
    { id: 2, name: "Restaurant 2", image: restaurant2 },
    { id: 3, name: "Restaurant 3", image: restaurant3 },
    { id: 4, name: "Restaurant 4", image: restaurant4 },
    { id: 5, name: "Restaurant 5", image: restaurant5 },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="flex-grow bg-zinc-200 dark:bg-night-200 text-gray-900 dark:text-gray-200">
      <SearchSection />
      <div className="container mx-auto p-4 mb-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Nearby Restaurants
        </h2>
        <div className="p-4 bg-gray-200 rounded-lg">
          <Slider {...settings} className="space-x-0.5 md:space-x-1">
            {dummyRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex justify-center">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="rounded-full w-16 h-16 md:w-24 md:h-24"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
