// src/components/About.jsx
import React from "react";

export default function About() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          
          {/* Image Column */}
          <div className="md:w-1/2">
            <div className="w-full h-64 md:h-96 bg-blue-100 rounded-lg flex items-center justify-center">
              {/* Placeholder for image */}
              <span className="text-gray-500 text-lg">About Image Here</span>
            </div>
          </div>

          {/* Content Column */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              We Always Want Safe and Healthy Water for Healthy Life.
            </h2>
            <p className="text-gray-700 mb-4">
              Dolor sit amet consectur elit sed eiusmod tempor incid dunt labore dolore magna aliqua...
            </p>
            <p className="text-gray-700 mb-6">
              Cepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim...
            </p>
            <a
              href="/about"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-lg transition duration-300"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

