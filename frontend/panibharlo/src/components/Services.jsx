// src/components/Services.jsx
import React from "react";

export default function Services() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center">
            <h4 className="text-xl font-semibold mb-2">Residential Water</h4>
            <p className="text-gray-600">Pure drinking water for families.</p>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center">
            <h4 className="text-xl font-semibold mb-2">Commercial Water</h4>
            <p className="text-gray-600">Safe water supply for offices & industries.</p>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center">
            <h4 className="text-xl font-semibold mb-2">Filtration Plants</h4>
            <p className="text-gray-600">Customized water treatment solutions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

