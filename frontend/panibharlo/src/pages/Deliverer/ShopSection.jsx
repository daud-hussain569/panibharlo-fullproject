import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const ShopSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (err) {
        setError('Failed to load products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-water flex flex-col">
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
      </div>
    </section>
  );
};

export default ShopSection;