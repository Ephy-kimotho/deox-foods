import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/images/deox-foods-logo.png";
import { IoCart } from "react-icons/io5";
import useCartStore from "../stores/useCartStore";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);

  const numOfItems = cart.reduce((sum, item) => {
    sum = sum + item.quantity;
    return sum;
  }, 0);

  return (
    <nav className="bg-gray-100 dark:bg-night-100 shadow-md py-4 font-sans fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between">
        {/* Logo with spacing from the left */}
        <div className="flex items-center pl-2">
          <img src={logo} alt="Deox Foods Logo" className="w-12 h-12" />
        </div>

        {/* Desktop Links in the Center */}
        <div className="hidden lg:flex items-center space-x-12">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-xl font-semibold ${
                isActive
                  ? "text-2xl font-bold text-orange-300"
                  : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="restraunts"
            className={({ isActive }) =>
              `text-xl font-semibold ${
                isActive
                  ? "text-2xl font-bold text-orange-300"
                  : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
              }`
            }
          >
            Restaurants
          </NavLink>

          <NavLink
            to="fruits"
            className={({ isActive }) =>
              `text-xl font-semibold ${
                isActive
                  ? "text-2xl font-bold text-orange-300"
                  : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
              }`
            }
          >
            Fruits
          </NavLink>

          <NavLink
            to="about"
            className={({ isActive }) =>
              `text-xl font-semibold ${
                isActive
                  ? "text-2xl font-bold text-orange-300"
                  : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="contact"
            className={({ isActive }) =>
              `text-xl font-semibold ${
                isActive
                  ? "text-2xl font-bold text-orange-300"
                  : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
              }`
            }
          >
            Contact Us
          </NavLink>
          <NavLink
            to="my-orders"
            className={({ isActive }) =>
              `text-xl font-semibold ${
                isActive
                  ? "text-2xl font-bold text-orange-300"
                  : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
              }`
            }
          >
            Orders
          </NavLink>
        </div>

        <div className="relative text-gray-800 w-10 dark:text-white ml-auto mr-4 lg:m-0 flex items-center">
          <Link to="cart">
            <span className="absolute -top-[6px] right-2 font-bold">
              {numOfItems}
            </span>
            <IoCart className="text-4xl" />
          </Link>
        </div>

        {/* Theme Toggle and Buttons on the Right */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="login"
            className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md"
          >
            Login
          </Link>
          <Link
            to="signup"
            className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md"
          >
            Sign Up
          </Link>

          <div className="flex items-center space-x-2">
            <ThemeToggle className="w-4 h-4" />
            <span className="text-gray-600 dark:text-gray-400 text-base font-semibold">
              Theme
            </span>
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className="lg:hidden pr-4">
          <button
            className="text-gray-600 dark:text-gray-400"
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-1/2 bg-gray-100 dark:bg-night-100 shadow-lg transform translate-x-0 transition-transform duration-300 flex flex-col justify-between">
          <button
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col justify-start mt-16 space-y-6 px-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg font-semibold ${
                  isActive
                    ? "text-xl font-bold text-orange-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="restraunts"
              className={({ isActive }) =>
                `text-lg font-semibold ${
                  isActive
                    ? "text-xl font-bold text-orange-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Restaurants
            </NavLink>

            <NavLink
              to="fruits"
              className={({ isActive }) =>
                `text-lg font-semibold ${
                  isActive
                    ? "text-xl font-bold text-orange-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Fruits
            </NavLink>
            <NavLink
              to="about"
              className={({ isActive }) =>
                `text-lg font-semibold ${
                  isActive
                    ? "text-xl font-bold text-orange-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="contact"
              className={({ isActive }) =>
                `text-lg font-semibold ${
                  isActive
                    ? "text-xl font-bold text-orange-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </NavLink>
            <NavLink
              to="my-orders"
              className={({ isActive }) =>
                `text-lg font-semibold ${
                  isActive
                    ? "text-xl font-bold text-orange-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-orange-200"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Orders
            </NavLink>
          </div>

          <div className="flex flex-col items-center space-y-4 mb-6 px-6">
            {/* Login and Signup Buttons */}
            <div className="flex space-x-4">
              <Link
                to="login"
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md"
              >
                Login
              </Link>
              <Link
                to="signup"
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md"
              >
                SignUp
              </Link>
            </div>

            {/* Theme Toggle and Title */}
            <div className="flex items-center space-x-2">
              <ThemeToggle className="w-4 h-4" />
              <span className="text-gray-600 dark:text-gray-400 text-base font-semibold">
                Theme
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
