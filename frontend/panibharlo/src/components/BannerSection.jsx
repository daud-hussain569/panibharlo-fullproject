// src/components/BannerSection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image: "/assets/images/banner/banner-1.jpg",
    heading: "Always Want Safe and Good Water for Healthy Life",
    text: "Excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit.",
  },
  {
    image: "/assets/images/banner/banner-2.jpg",
    heading: "Clean and Pure Water Anytime",
    text: "We deliver the best quality water for your home and business needs.",
  },
  {
    image: "/assets/images/banner/banner-3.jpg",
    heading: "Healthy Life Starts with Clean Water",
    text: "Trusted by thousands of families for safe and pure drinking water.",
  },
];

export default function BannerSection() {
  return (
    <section className="banner-section relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000 }}
        navigation
        pagination={{ clickable: true }}
        className="banner-carousel"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative w-full h-[500px] md:h-[650px] bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              <div className="container relative z-10 mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {slide.heading}
                  </h2>
                  <p className="mb-6">{slide.text}</p>
                  <div className="flex gap-4">
                    <a
                      href="/services"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                      Our Services
                    </a>
                    <a
                      href="/services"
                      className="bg-white text-blue-600 hover:bg-gray-200 px-6 py-3 rounded-lg"
                    >
                      Discover
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative vectors */}
              <img
                src="/assets/images/banner/vector-1.png"
                alt="vector1"
                className="absolute bottom-10 right-10 w-24 opacity-80"
              />
              <img
                src="/assets/images/banner/vector-2.png"
                alt="vector2"
                className="absolute top-10 left-10 w-20 opacity-80"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
