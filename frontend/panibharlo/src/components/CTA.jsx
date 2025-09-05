import React, { useState, useEffect } from "react";
import { FaWater, FaTruck, FaLeaf, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: FaWater,
    title: "Pure Water",
    description: "100% pure and safe drinking water",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: FaTruck,
    title: "Fast Delivery",
    description: "Same day delivery available",
    color: "from-teal-500 to-blue-600"
  },
  {
    icon: FaLeaf,
    title: "Eco-Friendly",
    description: "Sustainable packaging solutions",
    color: "from-green-500 to-teal-600"
  },
  {
    icon: FaShieldAlt,
    title: "Quality Assured",
    description: "Certified and tested water",
    color: "from-purple-500 to-pink-600"
  }
];

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Experience the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              Panibharlo Difference
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
            Join thousands of satisfied customers who trust us for their water needs. 
            Get started today with our premium water delivery services.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <button className="group bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center gap-3 btn-water">
                              <FaWater className="text-2xl" />
              Book Water Bottles
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
            
            <button className="group bg-transparent border-3 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 flex items-center gap-3 btn-water">
              <FaTruck className="text-2xl" />
              Book Tanker Service
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center group transform transition-all duration-500 ${
                activeFeature === index ? 'scale-110' : 'scale-100'
              }`}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl transition-all duration-300 ${
                activeFeature === index ? 'animate-pulse' : ''
              }`}>
                <feature.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-200 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`mt-20 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-cyan-300">10K+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-cyan-300">50K+</div>
                <div className="text-blue-100">Bottles Delivered</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-cyan-300">1000+</div>
                <div className="text-blue-100">Tanker Orders</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-cyan-300">24/7</div>
                <div className="text-blue-100">Support Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-4">Need Custom Solutions?</h3>
            <p className="text-xl text-blue-100 mb-6">
              Contact us for bulk orders, custom delivery schedules, or special requirements
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl btn-water">
                Contact Sales
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 btn-water">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
