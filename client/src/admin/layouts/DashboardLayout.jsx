import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ProductModal } from "../components/ProductModal";

export default function AdminDashBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility on mobile

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar on mobile

  return (
    <div className="flex w-full h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-30 lg:z-0 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar className="bg-gray-800 text-white shadow-lg h-screen w-64" />
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar} // Close sidebar when clicking outside
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar
          openModal={openModal}
          toggleSidebar={toggleSidebar} // Pass toggle function to Navbar
          className="bg-white shadow-md fixed w-full z-10"
        />

        {/* Page Content */}
        <main className="flex-1 w-full mt-16 lg:mt-0 px-4 lg:px-8 overflow-x-hidden overflow-y-auto p-4 lg:p-6">
          <div className="w-full bg-white shadow-md rounded-lg p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
          <ProductModal closeFunc={closeModal} />
        </div>
      )}
    </div>
  );
}