import Button from "./common/Button";
import plate1 from "../assets/images/plate1.jpg";
import plate2 from "../assets/images/plate2.jpg";
import plate3 from "../assets/images/plate3.jpg";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/restaurants");
  };

  return (
    <section className="mt-24 relative flex items-center justify-center">
      <div className="relative z-10 text-left p-8 md:pb-16 bg-gray-200 w-full rounded-lg min-h-[400px]">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-green-700">
          Hungry?
        </h1>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
          Let&apos;s deliver Happiness to your
        </h1>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-orange-400">
          doorstep!
        </h1>
        <p className="text-sm md:text-lg text-black mb-4">
          Discover a delightful variety of Dishes from the finest eateries
          around. Whether you&apos;re craving something adventurous or your
          favorite comfort meal, DeoxFoods ensures fast and reliable delivery
          straight to your doorstep. Let us transform your hunger into
          satisfaction with every bite.
        </p>
        <p className="text-sm md:text-lg text-green-700 mb-2">
          <span className="text-black">Deox</span>
          <span className="text-orange-400">Foods</span> – Your Hunger&apos;s
          Nightmare!
        </p>

        <div>
          <Button
            type="button"
            onClick={handleClick}
            moreStyles={
              "bg-orange-300 w-36 text-sm sm:text-base sm:w-44 md:w-52 shadow-lg active:shadow-none active:scale-95  mr-1 tracking-wide"
            }
          >
            view restaurants.
          </Button>
        </div>

        <div className="absolute bottom-0 right-0 flex flex-col items-end space-y-2 mr-4 mb-4">
          <img
            src={plate3}
            alt="Plate 3"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full"
          />
          <div className="flex items-end space-x-2">
            <img
              src={plate2}
              alt="Plate 2"
              className="w-12 h-12 md:w-22 md:h-22 rounded-full"
            />
            <img
              src={plate1}
              alt="Plate 1"
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
