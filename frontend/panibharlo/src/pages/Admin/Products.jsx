import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/products");
        setItems(Array.isArray(res.data) ? res.data.map(p => ({ ...p, id: p._id })) : []);
      } catch (e) {
        setErr(e.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (err) return <div className="text-red-600">Error: {err}</div>;

  const handleAddNewProduct = async () => {
    const name = window.prompt("Enter product name:");
    if (!name) return;
    const description = window.prompt("Enter product description:");
    const price = window.prompt("Enter product price:");
    const stock = window.prompt("Enter initial stock quantity:");

    if (!description || !price || !stock || isNaN(price) || isNaN(stock)) {
      alert("All fields are required. Price and stock must be numbers.");
      return;
    }

    try {
      const res = await api.post("/products", {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
      });
      // Add the new product to the top of the list
      const newProduct = { ...res.data, id: res.data._id };
      setItems(prevItems => [newProduct, ...prevItems]);
      alert("Product added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${productId}`);
      setItems(currentItems => currentItems.filter(item => item.id !== productId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
        {/* Placeholder for Add Product button */}
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          onClick={handleAddNewProduct}
        >
          Add New Product
        </button>
      </div>

      {items.length === 0 ? <div>No products found.</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(p => (
            <div key={p.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-semibold text-lg text-gray-900">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.description}</p>
                <p className="text-blue-600 font-bold mt-2 text-xl">Rs.{p.price}</p>
                <p className="text-sm text-gray-500 mt-2">Stock: {p.stock}</p>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                  {/* Add Edit button placeholder here later */}
                  <button onClick={() => handleDeleteProduct(p.id)} className="font-medium text-red-600 hover:text-red-800 transition-colors duration-200">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
