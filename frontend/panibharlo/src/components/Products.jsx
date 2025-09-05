// src/components/Products.jsx
import React from "react";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Mineral Water Bottle",
    size: "2L 3 Bottles",
    price: 70,
    image: "/assets/images/resource/shop/shop-1.jpg",
    desc: "Lorem ipsum dolor sit amet adipelit sed eiusmte.",
  },
  {
    id: 2,
    name: "Mineral Water Bottle",
    size: "3L 3 Bottles",
    price: 60,
    image: "/assets/images/resource/shop/shop-2.jpg",
    desc: "Lorem ipsum dolor sit amet adipelit sed eiusmte.",
  },
  {
    id: 3,
    name: "Mineral Water Bottle",
    size: "3L 2 Bottles",
    price: 55,
    image: "/assets/images/resource/shop/shop-3.jpg",
    desc: "Lorem ipsum dolor sit amet adipelit sed eiusmte.",
  },
];

export default function Products() {
  const { addToCart } = useCart();

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-700">
          We Deliver Best Quality Bottle Packs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform"
            >
              <img src={p.image} alt={p.name} className="w-full h-56 object-cover" />
              <div className="p-5">
                <span className="text-sm text-gray-500">{p.size}</span>
                <h4 className="text-lg font-semibold mt-1">{p.name}</h4>
                <h6 className="text-blue-600 font-bold">${p.price}.00</h6>
                <p className="text-gray-600 text-sm mt-2">{p.desc}</p>
                <button
                  onClick={() => addToCart(p)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
