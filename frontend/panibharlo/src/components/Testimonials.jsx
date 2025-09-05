// src/components/Testimonials.jsx
import React, { useState, useEffect, useMemo } from "react";
import { FaStar, FaWater, FaTruck } from "react-icons/fa";
import api from "../api/axios";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => setIsVisible(true), []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await api.get("/testimonials");
        // Add icon based on category for display
        const testimonialsWithIcons = data.map(t => ({ ...t, icon: t.category === 'bottle' ? FaWater : FaTruck }));
        setTestimonials(testimonialsWithIcons);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === "all") return testimonials;
    return testimonials.filter((t) => t.category === activeCategory);
  }, [activeCategory, testimonials]);

  // When the filter changes, reset the carousel to the first item.
  useEffect(() => {
    setCurrentTestimonial(0);
  }, [activeCategory]);

  useEffect(() => {
    // Don't run the interval if there are no testimonials to cycle through.
    if (filteredTestimonials.length === 0) {
      return;
    }
    const interval = setInterval(() => {
      // Cycle through the *filtered* list, not the full list.
      setCurrentTestimonial((prev) => (prev + 1) % filteredTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredTestimonials.length]);

  const currentTestimonialData = filteredTestimonials[currentTestimonial];

  if (!currentTestimonialData) {
    // This can happen briefly when filters change or data is loading.
    // It prevents a crash if the component tries to render with undefined data.
    return null;
  }

  if (testimonials.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            What Our Customers Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our valued customers have to say about their experience with Panibharlo.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-4 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeCategory === "all"
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setActiveCategory("bottle")}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
              activeCategory === "bottle"
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
            }`}
          >
            <FaWater className="text-lg" /> Bottled Water
          </button>
          <button
            onClick={() => setActiveCategory("tanker")}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
              activeCategory === "tanker"
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
            }`}
          >
            <FaTruck className="text-lg" /> Tanker Services
          </button>
        </div>

        {/* Testimonial Display */}
        <div className={`max-w-4xl mx-auto transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 relative overflow-hidden">
            {/* Background Patterns */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full translate-y-8 -translate-x-8 opacity-50"></div>

            {/* Testimonial Content */}
            <div className="relative z-10 text-center">
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(currentTestimonialData.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                &ldquo;{currentTestimonialData.content}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <currentTestimonialData.icon className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900">{currentTestimonialData.name}</h4>
                  <p className="text-gray-600 text-sm">{currentTestimonialData.role}</p>
                  <p className="text-blue-600 text-xs font-medium">{currentTestimonialData.company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">4.9/5</div>
            <div className="text-gray-600 text-sm md:text-base">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">98%</div>
            <div className="text-gray-600 text-sm md:text-base">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">5000+</div>
            <div className="text-gray-600 text-sm md:text-base">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">24/7</div>
            <div className="text-gray-600 text-sm md:text-base">Support Available</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-12 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 md:p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Join Our Happy Customers</h3>
            <p className="text-lg md:text-xl text-blue-100 mb-4 md:mb-6">
              Experience the Panibharlo difference today
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
