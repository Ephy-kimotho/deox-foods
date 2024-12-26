import { fruits } from "../data";

const Fruits = () => {
  const handleAddToCart = (fruitName) => {
    alert(`${fruitName} added to cart!`);
  };

  return (
    <div className="p-6 bg-zinc-200 dark:bg-night-200 min-h-screen flex-grow">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#2C3E50] dark:text-orange-300 mt-20">
        Available Fruits
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={fruit.image}
              alt={fruit.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-[#2C3E50]">
                {fruit.name}
              </h2>
              <p className="text-sm text-gray-600">{fruit.description}</p>
              <p className="text-sm">
                Price: <span className="font-medium">Ksh.{fruit.price}</span>
              </p>
              <button
                className="mt-4 bg-[#FD661D] text-white px-4 py-2 rounded-md hover:bg-[#e85c1a]"
                onClick={() => handleAddToCart(fruit.name)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fruits;
