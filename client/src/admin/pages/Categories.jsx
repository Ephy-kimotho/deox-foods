import { useState } from "react";
import { CategoryModal } from "../components/CategoryModal"; // Import the modal

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const openModal = () => setIsModalOpen(true); // Function to open the modal
  const closeModal = () => setIsModalOpen(false); // Function to close the modal

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

      {/* List of categories (mock data) */}
      <div className="space-y-4">
        {[
          { id: 1, name: "Fast Food", description: "Quick and tasty meals" },
          { id: 2, name: "Italian", description: "Pasta, pizza, and more" },
          { id: 3, name: "Japanese", description: "Sushi and ramen" },
        ].map((category) => (
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
              onClick={() => {
                // Add logic to delete the category
                console.log("Delete category:", category.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
