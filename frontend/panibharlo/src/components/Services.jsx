// src/components/Services.jsx
import React, { useState, useEffect } from "react";
import { FaWater, FaTruck, FaFilter, FaLeaf, FaShieldAlt, FaUsers, FaIndustry } from "react-icons/fa";

const services = [
  {
    icon: FaWater,
    title: "Premium Bottled Water",
    description: "High-quality bottled water in various sizes (1.5L, 2.5L, 5L) for homes and offices. Pure, safe, and refreshing.",
    features: ["Multiple sizes available", "Bulk ordering", "Regular delivery"],
    color: "from-blue-500 to-cyan-500",
    iconColor: "text-blue-600"
  },
  {
    icon: FaTruck,
    title: "Tanker Water Delivery",
    description: "Large volume water delivery for construction sites, industries, and commercial establishments. Fast and reliable service.",
    features: ["Large capacity", "Flexible scheduling", "Real-time tracking"],
    color: "from-teal-500 to-blue-600",
    iconColor: "text-teal-600"
  },
  {
    icon: FaFilter,
    title: "Water Filtration Systems",
    description: "Customized water treatment solutions for homes and businesses. Advanced filtration technology for pure water.",
    features: ["Custom solutions", "Maintenance support", "Quality guarantee"],
    color: "from-emerald-500 to-teal-600",
    iconColor: "text-emerald-600"
  },
  {
    icon: FaIndustry,
    title: "Commercial Water Supply",
    description: "Dedicated water supply solutions for restaurants, hotels, hospitals, and industrial facilities.",
    features: ["24/7 availability", "Quality assurance", "Volume discounts"],
    color: "from-purple-500 to-pink-600",
    iconColor: "text-purple-600"
  },
  {
    icon: FaUsers,
    title: "Residential Services",
    description: "Convenient water delivery for families. Choose your preferred delivery schedule and water type.",
    features: ["Flexible scheduling", "Multiple options", "Family packages"],
    color: "from-orange-500 to-red-500",
    iconColor: "text-orange-600"
  },
  {
    icon: FaShieldAlt,
    title: "Quality Assurance",
    description: "Every drop of water is tested and certified. We maintain the highest standards of purity and safety.",
    features: ["Regular testing", "Certification", "Safety compliance"],
    color: "from-indigo-500 to-purple-600",
    iconColor: "text-indigo-600"
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Premium Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of water delivery services designed to meet all your hydration needs. 
            From bottled water to tanker delivery, we&apos;ve got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer ${
                activeService === index ? 'ring-4 ring-blue-200 scale-105' : ''
              }`}
              onClick={() => setActiveService(index)}
            >
              {/* Service Icon */}
              <div className={`p-4 bg-gradient-to-br ${service.color} rounded-t-2xl`}>
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <service.icon className={`text-2xl ${service.iconColor}`} />
                </div>
              </div>

              {/* Service Content */}
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-3 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                </div>
              </div>

              {/* Floating Action Button */}
              <div className="absolute -top-3 -right-3 w-7 h-7 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                <FaLeaf className="text-white text-xs" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 md:p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Get Started?</h3>
            <p className="text-lg md:text-xl text-blue-100 mb-4 md:mb-6">
              Join thousands of satisfied customers who trust Panibharlo for their water needs
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Book Now
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
