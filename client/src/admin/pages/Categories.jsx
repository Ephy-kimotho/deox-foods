import { useState, useEffect } from "react"; // Added useEffect import
import axios from "axios"; // Added axios import
import { CategoryModal } from "../components/CategoryModal"; // Import the modal

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [categories, setCategories] = useState([]);

  const openModal = () => setIsModalOpen(true); // Function to open the modal
  const closeModal = () => setIsModalOpen(false); // Function to close the modal

  useEffect(() => {
    fetchCategories();
  }, []); // Fetch categories on initial render

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  /* const addCategory = async (newCategory) => {
    try {
      const response = await axios.post("/api/categories", newCategory);
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  }; */

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="p-4 mt-10 text-black max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Categories</h1>

      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
      >
        Add Category
      </button>

      {/* Render the modal conditionally */}
      {isModalOpen && <CategoryModal closeFunc={closeModal} />}

      {/* List of categories */}
      <div className="space-y-4">
  {Array.isArray(categories) && categories.length > 0 ? (
    categories.map((category) => (
      <div
        key={category.id}
        className="flex flex-col md:flex-row justify-between items-start md:items-center border p-4 rounded-lg shadow space-y-2 md:space-y-0"
      >
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{category.name}</h2>
          <p className="text-gray-600">{category.description}</p>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 md:w-auto w-full"
          onClick={() => deleteCategory(category.id)}
        >
          Delete
        </button>
      </div>
    ))
  ) : (
    <p>No categories available or invalid data format</p>
  )}
</div>

    </div>
  );
}