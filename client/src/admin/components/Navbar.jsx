export default function Navbar({ openModal, toggleSidebar, className }) {
  return (
    <div className={`flex items-center justify-between p-4 ${className}`}>
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 focus:outline-none"
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
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>


      {/* Other Navbar Content */}
      <div className="flex items-center gap-4">
        <button
          onClick={openModal}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}