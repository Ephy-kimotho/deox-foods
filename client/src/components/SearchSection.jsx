import SearchBar from "./SearchBar";
import plate1 from "../assets/images/plate1.jpg";
import plate2 from "../assets/images/plate2.jpg";
import plate3 from "../assets/images/plate3.jpg";

const SearchSection = () => {
  return (
    <section className="mt-24 relative  flex items-center justify-center ">
      <div
        className="relative z-10 text-left p-8 bg-gray-200 w-full max-w-screen-xl mx-auto rounded-lg"
      >
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
        <p className="text-sm md:text-lg text-green-700 mb-4">
          <span className="text-black">Deox</span>
          <span className="text-orange-400">Foods</span> – Your Hunger&apos;s
          Nightmare!
        </p>
        <div className="flex flex-col items-start space-y-4 mb-8">
          <SearchBar />
          <div className="flex flex-wrap space-x-1 md:space-x-2">
            <button className="px-1 py-1 md:px-2 md:py-2 border-2 border-gray-400 rounded-full hover:text-orange-400 transition-colors">
              Beans
            </button>
            <button className="px-1 py-1 md:px-2 md:py-2 border-2 border-gray-400 rounded-full hover:text-orange-400 transition-colors">
              Rice
            </button>
            <button className="px-1 py-1 md:px-2 md:py-2 border-2 border-gray-400 rounded-full hover:text-orange-400 transition-colors">
              Chapati
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex flex-col items-end space-y-2 mr-4 mb-4">
          <img
            src={plate3}
            alt="Plate 3"
            className="w-12 h-12 md:w-22 md:h-22 rounded-full"
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
              className="w-16 h-16 md:w-24 md:h-24 rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
