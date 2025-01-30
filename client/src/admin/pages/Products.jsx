import { useState,useEffect } from "react";



export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product) => (
          <CardComponent key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

function CardComponent({ product, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 sm:h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-base sm:text-lg">{product.name}</h2>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={product.image}
              alt={product.vendor}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
            />
            <span className="text-sm">{product.vendor}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-100">
              Edit
            </button>
            <button
              className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-100"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
