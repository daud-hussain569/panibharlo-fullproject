import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border-t">
              <td className="px-4 py-2">{p._id}</td>
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.price}</td>
              <td className="px-4 py-2">{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
