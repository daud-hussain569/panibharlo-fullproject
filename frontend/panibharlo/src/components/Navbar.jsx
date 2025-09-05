// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import SearchBox from './SearchBox';
import { useCart } from '../context/CartContext';

const WaterSplashLogo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-12 h-12">
      <img
        src="/assets/images/watersplash.jpg.PNG"
        alt="Water Splash Logo"
        className="w-full h-full object-contain animate-pulse drop-shadow-lg"
      />
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
        PaniBharlo
      </span>
      <span className="text-xs text-cyan-200 font-medium -mt-1">
        Pure Water Delivery
      </span>
    </div>
  </div>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const toggleSearch = () => setSearchOpen(prev => !prev);
  const closeSearch = () => setSearchOpen(false);
  const toggleCart = () => setCartOpen(prev => !prev);

  const scrollToId = (id) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (e, sectionId, hrefFallback = "/") => {
    if (e) e.preventDefault();
    setMobileOpen(false);
    closeSearch();
    if (location.pathname === "/") {
      scrollToId(sectionId);
    } else {
      navigate(hrefFallback);
      setTimeout(() => scrollToId(sectionId), 200);
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollToId(id), 120);
    }
    setMobileOpen(false);
    closeSearch();
  }, [location.pathname, location.hash]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Logo */}
          <a
            href="/#home"
            onClick={(e) => handleNavClick(e, "home", "/")}
            className="hover:scale-105 transition-transform duration-300"
          >
            <WaterSplashLogo />
          </a>

          {/* Center: Nav Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-6 items-center">
            {["home", "about", "services", "products", "contact"].map(section => (
              <a
                key={section}
                href={`/#${section}`}
                onClick={(e) => handleNavClick(e, section, "/")}
                className="hover:text-cyan-200 transition-colors duration-300 font-medium"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>

          {/* Right: Actions (search, cart, login/admin) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/admin/login" className="hover:text-cyan-200 transition-colors duration-300 font-medium">
              Admin
            </Link>
            <Link to="/login" className="hover:text-cyan-200 transition-colors duration-300 font-medium">
              Login
            </Link>

            {/* Search icon - second last */}
            <button onClick={toggleSearch} className="hover:text-cyan-200 transition-colors duration-300 hover:scale-110 transform" aria-label="Open search">
              <FaSearch size={18} />
            </button>

            {/* Cart icon - extreme right */}
            <div className="relative">
              <button onClick={toggleCart} className="hover:text-cyan-200 transition-colors duration-300 hover:scale-110 transform relative" aria-label="Open cart">
                <FaShoppingCart size={20} />
                {cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1 animate-pulse">
                    {cart.length}
                  </span>
                )}
              </button>

              {cartOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-900 rounded-lg shadow-lg p-3 z-50">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Cart is empty</p>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center border-b py-2">
                        <span>{item.name}</span>
                        <span className="font-semibold">x{item.qty}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleSearch} aria-label="Open search">
              <FaSearch size={22} className="hover:text-cyan-200 transition-colors duration-300" />
            </button>
            <button onClick={toggleMobileMenu} aria-label="Toggle menu">
              {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-gradient-to-b from-blue-700 to-blue-800 px-4 pb-4 shadow-lg">
            {["home", "about", "services", "products", "contact"].map(section => (
              <a
                key={section}
                href={`/#${section}`}
                onClick={(e) => handleNavClick(e, section, "/")}
                className="block py-2 hover:text-cyan-200 transition-colors duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}

            <Link to="/admin/login" className="block py-2 hover:text-cyan-200 transition-colors duration-300" onClick={() => setMobileOpen(false)}>
              Admin
            </Link>
            <Link to="/login" className="block py-2 hover:text-cyan-200 transition-colors duration-300" onClick={() => setMobileOpen(false)}>
              Login
            </Link>

            {/* Mobile Cart */}
            <div className="relative mt-2">
              <button onClick={toggleCart} className="block w-full text-left py-2 hover:text-cyan-200 transition-colors duration-300 relative">
                Cart {cart?.length > 0 && <span className="ml-1 bg-red-500 text-xs rounded-full px-1 animate-pulse">{cart.length}</span>}
              </button>
              {cartOpen && (
                <div className="absolute left-0 mt-1 w-full bg-white text-gray-900 rounded-lg shadow-lg p-3 z-50">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Cart is empty</p>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center border-b py-2">
                        <span>{item.name}</span>
                        <span className="font-semibold">x{item.qty}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {searchOpen && <SearchBox onClose={closeSearch} />}
    </>
  );
}
