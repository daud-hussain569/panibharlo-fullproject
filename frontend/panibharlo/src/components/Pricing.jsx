// src/components/Pricing.jsx
import React from "react";

export default function Pricing() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Pricing Plans</h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center">
            <h4 className="text-xl font-semibold mb-2">Basic Plan</h4>
            <h2 className="text-3xl font-bold mb-2">Rs. 999</h2>
            <p className="text-gray-600 mb-4">10 Bottles / Month</p>
            <a
              href="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-lg transition duration-300"
            >
              Choose Plan
            </a>
          </div>

          {/* Standard Plan */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center">
            <h4 className="text-xl font-semibold mb-2">Standard Plan</h4>
            <h2 className="text-3xl font-bold mb-2">Rs. 2499</h2>
            <p className="text-gray-600 mb-4">30 Bottles / Month</p>
            <a
              href="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-lg transition duration-300"
            >
              Choose Plan
            </a>
          </div>

          {/* Premium Plan */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center">
            <h4 className="text-xl font-semibold mb-2">Premium Plan</h4>
            <h2 className="text-3xl font-bold mb-2">Rs. 4999</h2>
            <p className="text-gray-600 mb-4">Unlimited Supply</p>
            <a
              href="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-lg transition duration-300"
            >
              Choose Plan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

