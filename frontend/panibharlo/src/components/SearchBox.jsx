import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SearchBox({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Focus the input when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle closing with the Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      onClose(); // Close the search box after searching
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-start justify-center pt-20 backdrop-blur-sm"
      onClick={onClose} // Close when clicking on the backdrop
    >
      <div
        className="relative bg-white w-full max-w-xl rounded-lg shadow-2xl p-4 mx-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the box
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close search"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Search for Products</h2>
        <form onSubmit={handleSearch} className="relative flex items-center">
          <div className="absolute left-4 text-gray-400 pointer-events-none">
            <FaSearch size={20} />
          </div>
          <input
            ref={inputRef}
            type="search"
            name="search-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for bottles, tankers..."
            required
            className="w-full pl-12 pr-32 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
