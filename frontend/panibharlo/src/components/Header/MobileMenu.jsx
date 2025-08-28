// src/components/MobileMenu.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        className="md:hidden p-2 text-white bg-blue-600 rounded"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-3/4 max-w-xs bg-white h-full p-6 flex flex-col">
            {/* Close button */}
            <button
              className="self-end mb-4 text-gray-700 text-2xl font-bold"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            {/* Logo */}
            <div className="mb-6">
              <div className="w-32 h-10 bg-blue-600 text-white flex items-center justify-center font-bold rounded">
                LOGO
              </div>
            </div>

            {/* Menu links */}
            <nav className="flex flex-col space-y-4 mb-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600" onClick={() => setOpen(false)}>About</Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600" onClick={() => setOpen(false)}>Services</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600" onClick={() => setOpen(false)}>Contact</Link>
            </nav>

            {/* Contact Info */}
            <div className="text-gray-700 mt-auto">
              <h4 className="font-semibold mb-2">Contact Info</h4>
              <ul className="space-y-1 text-sm">
                <li>Rawalpindi, Pakistan</li>
                <li><a href="tel:+923001112223" className="hover:text-blue-600">+92 300 1112223</a></li>
                <li><a href="mailto:info@acuasafe.com" className="hover:text-blue-600">info@acuasafe.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

