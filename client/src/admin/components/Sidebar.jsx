import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for the menu

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Menu Icon */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <button onClick={toggleSidebar} className="text-white">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-3xl font-semibold tracking-wide">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link
                to="/admin/products"
                className="block px-6 py-3 text-sm font-medium hover:bg-gray-800 rounded-lg transition duration-200 ease-in-out"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categories"
                className="block px-6 py-3 text-sm font-medium hover:bg-gray-800 rounded-lg transition duration-200 ease-in-out"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="block px-6 py-3 text-sm font-medium hover:bg-gray-800 rounded-lg transition duration-200 ease-in-out"
              >
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile view */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 md:hidden"
        ></div>
      )}
    </div>
  );
}
