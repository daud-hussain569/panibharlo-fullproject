// src/components/StickyHeader.jsx
import React from "react";
import Navbar from "./Navbar";
import SearchBox from "../SearchBox";
import CartBox from "../CartBox";

export default function StickyHeader() {
  return (
    <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-32 h-10 bg-white rounded flex items-center justify-center text-blue-600 font-bold">
            LOGO
          </div>
        </div>

        {/* Navbar */}
        <div className="flex-1 mx-6">
          <Navbar />
        </div>

        {/* Right-side actions */}
        <div className="flex items-center space-x-4">
          <SearchBox />
          <CartBox />
          <a
            href="/"
            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-100 transition duration-300"
          >
            Request A Quote
          </a>
        </div>
      </div>
    </header>
  );
}
