import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWater, FaTruck } from "react-icons/fa";
import api from "../api/axios";

export default function ShopSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products"); // Make sure backend is running
        console.log("Products response:", res.data);
        const data = Array.isArray(res.data) ? res.data.map(p => ({ ...p, id: p._id || p.id })) : [];
        setProducts(data);
        setErr("");
      } catch (e) {
        console.error("Error fetching products:", e);
        setErr(e.response?.data?.message || e.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const bottles = products.filter(p => p.category === "bottle");
  const tankers = products.filter(p => p.category === "tanker");

  const categories = [
    { id: "all", name: "All Products", icon: FaWater, count: products.length },
    { id: "bottle", name: "Bottled Water", icon: FaWater, count: bottles.length },
    { id: "tanker", name: "Tanker Services", icon: FaTruck, count: tankers.length },
  ];

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Loading state
  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );

  // Error state
  if (err) return (
    <div className="text-center py-20">
      <div className="text-red-600 text-xl mb-4">Error: {err}</div>
      <button 
        onClick={() => window.location.reload()} 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Premium Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our wide range of high-quality water products. From individual bottles to bulk tanker services, we have solutions for every need.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="text-lg" />
              {category.name}
              <span className={`px-2 py-1 rounded-full text-sm ${activeCategory === category.id ? 'bg-white/20' : 'bg-blue-100 text-blue-600'}`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-water flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-semibold text-xl text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mt-2 flex-grow">{product.description}</p>
                  <div className="mt-4">
                    <p className="text-blue-600 font-bold text-2xl">Rs.{product.price}</p>
                    <p className="text-sm text-gray-500 mt-1">Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}</p>
                  </div>
                </div>
                <div className="p-6 bg-gray-50/50">
                  <Link
                    to="/register"
                    className="block w-full text-center bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-500 text-xl mb-4">No products found in this category</div>
            <button onClick={() => setActiveCategory("all")} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              View All Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
