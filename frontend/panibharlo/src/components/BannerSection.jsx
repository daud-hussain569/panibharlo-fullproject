// src/components/BannerSection.jsx
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { FaWater, FaTruck, FaShieldAlt } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    image: "/assets/images/banner/ghi.jpeg",
    contentImage: "/assets/images/banner/eert.jpg",
    heading: "Pure Water, Healthy Life",
    subheading: "Book Water Bottles & Tankers",
    text: "Get fresh, pure drinking water delivered to your doorstep. Choose from our premium bottled water or book tanker services for larger volumes.",
    icon: FaWater,
    color: "from-blue-500 to-cyan-500",
  },
  {
    image: "/assets/images/banner/jkl.jpg",
    contentImage: "/assets/images/banner/jkl.jpg",
    heading: "Fast & Reliable Delivery",
    subheading: "Same Day Service Available",
    text: "Experience lightning-fast water delivery with our professional team. Track your order in real-time and get notified at every step.",
    icon: FaTruck,
    color: "from-teal-500 to-blue-600",
  },
  {
    image: "/assets/images/banner/abc.jpg",
    contentImage: "/assets/images/banner/abc.jpg",
    heading: "Premium Quality Water",
    subheading: "Certified & Tested",
    text: "Every drop of water we deliver meets the highest quality standards. Our water is regularly tested and certified for purity and safety.",
    icon: FaShieldAlt,
    color: "from-emerald-500 to-teal-600",
  },
];

export default function BannerSection() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="banner-section relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full filter blur-lg opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full filter blur-lg opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-200 rounded-full filter blur-lg opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation
        pagination={{ clickable: true }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="banner-carousel"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative w-full h-[600px] md:h-[700px] bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-25`}></div>

              <div className="container relative z-10 mx-auto px-4 flex items-center">
                {/* Left Content */}
                <div
                  className={`max-w-3xl text-white transform transition-all duration-1000 ${
                    activeIndex === i ?
                    "translate-y-0 opacity-100" :
                    "translate-y-10 opacity-0"
                  }`}
                >
                  <div className="mb-6">
                    <slide.icon className="text-6xl md:text-7xl text-white/90 animate-pulse" />
                  </div>
                  <p className="text-lg md:text-xl text-white/90 mb-3 font-medium drop-shadow-md">
                    {slide.subheading}
                  </p>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
                    {slide.heading}
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
                    {slide.text}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => navigate("/register")}
                      className="group bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                    >
                      <FaWater className="text-xl" />
                      Book Bottle
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                      <FaTruck className="text-xl" />
                      Book Tanker
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </div>

                {/* Right Side Image */}
                <div
                  className={`hidden md:block relative w-[500px] h-[400px] ml-auto transform transition-transform duration-1000 rounded-full overflow-hidden shadow-2xl top-24 ${
                    activeIndex === i ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
                  }`}
                >
                  <img
                    src={slide.contentImage}
                    alt={slide.heading}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}
