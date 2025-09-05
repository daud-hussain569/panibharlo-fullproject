import React from "react";
import { FaWater, FaTruck, FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

// A reusable product card component
export default function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    // You can add a toast notification here for better UX
    console.log("Added to cart:", product.name);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`} className="block w-full h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
          {product.category === "bottle" ? <FaWater className="text-6xl text-blue-500" /> : <FaTruck className="text-6xl text-teal-500" />}
        </Link>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${product.category === "bottle" ? 'bg-blue-500' : 'bg-teal-500'}`}>
            {product.category === "bottle" ? "Bottle" : "Tanker"}
          </span>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex flex-col gap-2">
            <Link to={`/products/${product.id}`} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 hover:bg-white transition-colors duration-300" aria-label="View product details">
              <FaEye className="text-sm" />
            </Link>
            <button onClick={handleAddToCart} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 hover:bg-white transition-colors duration-300" aria-label="Add to cart">
              <FaShoppingCart className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description || "Premium quality water product for your needs"}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-blue-600">₹{product.price || "Contact"}</div>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>
        <button onClick={handleAddToCart} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          {product.category === "bottle" ? "Add to Cart" : "Book Now"}
        </button>
      </div>
    </div>
  );
}