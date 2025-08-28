import React from "react";

export default function CTA() {
  return (
    <section className="relative bg-blue-100 py-20 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300 rounded-full opacity-20"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image Column (Placeholder) */}
          <div className="md:w-1/2">
            <div className="w-full h-64 md:h-96 bg-blue-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">CTA Image</span>
            </div>
          </div>

          {/* Content Column */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Ready To Get Our Premium Water Delivery Service.
            </h2>
            <p className="text-gray-700 mb-4">
              We give our services to more than 10 countries. We deliver using 50+ couriers within 2hr anywhere in the city.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Free Delivery</li>
              <li>7 Days In A Week Service</li>
            </ul>
            <a
              href="/services"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-lg transition duration-300"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
