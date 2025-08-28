// src/components/News.jsx
import React from "react";

const news = [
  {
    title: "Consecter Elit Dui Eiusmod Didunt Labore Dolor.",
    author: "Nelly Farel",
    date: "Aug 07, 2021",
  },
  {
    title: "Taking The Pattern Library To The Next Level",
    author: "Monica Bana",
    date: "Aug 07, 2021",
  },
  {
    title: "How New Font Improve The Web",
    author: "Hard Branots",
    date: "Aug 07, 2021",
  },
];

export default function News() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Stay Updated with <br /> Acuasafe
          </h2>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
              {/* Image Placeholder */}
              <div className="h-48 bg-blue-100 flex items-center justify-center">
                <span className="text-gray-500">News Image</span>
              </div>

              <div className="p-6">
                <div className="text-sm text-blue-500 mb-2">Consulting</div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <ul className="flex space-x-4 text-gray-500 text-sm mb-4">
                  <li>{item.author}</li>
                  <li>{item.date}</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                </p>
                <a
                  href="#"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
