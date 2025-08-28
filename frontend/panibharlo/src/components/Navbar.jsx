// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="bg-blue-600 text-white shadow-md relative">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          PaniBharlo
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/services" className="hover:text-gray-200">Services</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
        </div>

        {/* Right-side actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/admin/login" className="hover:text-gray-200">Admin</Link>
          <Link to="/login" className="hover:text-gray-200">Login</Link>
          <button className="hover:text-gray-200"><FaSearch size={18} /></button>
          <button className="hover:text-gray-200 relative">
            <FaShoppingCart size={18} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">2</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-blue-600 px-4 pb-4">
          <Link to="/" className="block py-2 hover:text-gray-200" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/about" className="block py-2 hover:text-gray-200" onClick={toggleMobileMenu}>About</Link>
          <Link to="/services" className="block py-2 hover:text-gray-200" onClick={toggleMobileMenu}>Services</Link>
          <Link to="/contact" className="block py-2 hover:text-gray-200" onClick={toggleMobileMenu}>Contact</Link>
          <Link to="/admin/login" className="block py-2 hover:text-gray-200" onClick={toggleMobileMenu}>Admin</Link>
          <Link to="/login" className="block py-2 hover:text-gray-200" onClick={toggleMobileMenu}>Login</Link>
        </div>
      )}
    </nav>
  );
}
