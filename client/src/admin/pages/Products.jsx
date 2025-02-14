/* eslint-disable react/prop-types */
import { useState } from "react";
import { ProductModal } from "../components/ProductModal";
import { useOutletContext } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
//import { getAllProducts } from "../services/api";
//import { getAllResturants } from "../services/api";
//import { BASE_URL } from "../../utils/utils";

const decodeToken = (token) => {
  if (!token) return null;

  try {
    const userInfo = jwtDecode(token);
    return userInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useOutletContext();

  console.log("User details: ", decodeToken(token));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /*   useEffect(() => {
    const getRes = async () => {
      const res = await axios.get(`${BASE_URL}/restaurant/restaurants/`);
      const data = res.data[2].id;
      setHotelId(data);
    };

    getRes();

    const fetchProducts = async () => {
      try {
              console.log("Fetching products...");
        const response = await getAllProducts(token); // Pass token here
        console.log(response);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (token) {
      fetchProducts();
    }                                                                                                                                                   
  }, [token]); */

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Pass token in the request
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="flex items-center justify-end  gap-4">
        <button
          onClick={openModal}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product) => (
          <CardComponent
            key={product.id}
            product={product}
            onDelete={deleteProduct}
          />
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
          <ProductModal closeFunc={closeModal} />
        </div>
      )}
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
              product.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {product.description}
        </p>
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
