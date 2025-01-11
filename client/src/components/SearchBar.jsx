/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center justify-center  rounded-full overflow-hidden bg-white  shadow-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 md:p-3 rounded-l-full font-sans outline-none w-40 md:w-64 bg-white  placeholder:text-gray-600"
        placeholder="Search..."
      />
      <button
        onClick={handleSearch}
        className="p-2 md:p-3 rounded-r-full flex items-center justify-center bg-white"
      >
        <FiSearch size={20} md:size={24} color="orange" />
      </button>
    </div>
  );
};

export default SearchBar;
