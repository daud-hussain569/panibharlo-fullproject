// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BannerSection from "../components/BannerSection";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { useCart } from "../context/CartContext";

import { FaLeaf, FaShieldAlt, FaClock, FaUsers } from "react-icons/fa";

// Slide-in content for text
function ContentSlide() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`space-y-8 transform transition-all duration-1000 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
      }`}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        About Panibharlo
      </h2>

      <p className="text-xl text-gray-600 leading-relaxed">
        Panibharlo is your trusted partner for premium water delivery
        services. We specialize in providing high-quality bottled water and
        reliable tanker services to homes, offices, and industries across the
        region.
      </p>

      <p className="text-lg text-gray-600 leading-relaxed">
        With years of experience and a commitment to excellence, we ensure that
        every drop of water we deliver meets the highest standards of purity and
        safety. Our mission is to make clean, safe drinking water accessible to
        everyone.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FaLeaf className="text-blue-600 text-xl" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Eco-Friendly</h4>
            <p className="text-sm text-gray-600">Sustainable practices</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
            <FaShieldAlt className="text-teal-600 text-xl" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Quality Assured</h4>
            <p className="text-sm text-gray-600">Certified & tested</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <FaClock className="text-green-600 text-xl" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">24/7 Service</h4>
            <p className="text-sm text-gray-600">Always available</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <FaUsers className="text-purple-600 text-xl" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Customer First</h4>
            <p className="text-sm text-gray-600">Your satisfaction matters</p>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
          Learn More
        </button>
        <button className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
          Contact Us
        </button>
      </div>
    </div>
  );
}

// Slide-in image with hover and staggered floating shapes
function ImageSlide() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative transform transition-all duration-1000 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
      } group`}
    >
      <div className="relative z-10">
        <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center overflow-hidden">
          <img
            src="/assets/images/gffdd.jpg.webp"
            alt="Truck"
            className="object-contain w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 group-hover:shadow-2xl"
          />
        </div>
      </div>

      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full opacity-60 animate-pulse animation-delay-0"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-60 animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-60 animate-pulse animation-delay-2000"></div>
    </div>
  );
}

// Products Section with functional Add to Cart
function ProductsSection() {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "Premium Bottled Water", image: "/assets/images/dsfd.jpeg", price: 50 },
    { id: 2, name: "Water Tanker Service", image: "/assets/images/wetwe.jpg", price: 500 },
    { id: 3, name: "Mineral Water Pack", image: "/assets/images/dfgfdk.jpg", price: 120 },
    { id: 4, name: "Refill Service", image: "/assets/images/weqer.jfif", price: 40 },
  ];

  return (
    <section id="products" className="pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover object-position-top-center transition-transform duration-500 hover:scale-105"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-blue-600 font-bold mt-1">Rs.{product.price}</p>
                <div className="mt-4 flex flex-col items-center gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transform transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                  <Link to="/register" className="w-full">
                    <button className="w-full bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transform transition-all duration-300 hover:scale-105">
                      Order Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <main id="home">
          <BannerSection />
        </main>

        <section id="about" className="pt-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ContentSlide />
              <ImageSlide />
            </div>
          </div>
        </section>

        <section id="services" className="pt-20">
          <Services />
        </section>

        {/* Products Section */}
        <ProductsSection />

        <section id="testimonials" className="pt-20 pb-8">
          <Testimonials />
        </section>

        <CTA />

        <section id="contact" className="py-8 bg-gray-50">
          <Contact />
        </section>

        <Footer />
      </div>
    </>
  );
}
