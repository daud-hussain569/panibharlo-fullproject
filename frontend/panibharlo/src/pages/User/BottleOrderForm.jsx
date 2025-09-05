import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function BottleOrderForm() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("1.5"); // litres as string
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        // Filter for bottle products if needed, or handle on backend
        setProducts(data);
        if (data.length > 0) {
          setProductId(data[0]._id); // Default to the first product
        }
      } catch (err) {
        setError("Could not load products.");
      }
    };
    fetchProducts();
  }, []);

  const validate = () => {
    if (!productId) return "Please select a product.";
    if (quantity < 1) return "Quantity must be at least 1";
    if (!address.trim()) return "Please enter delivery address";
    if (!contact.trim()) return "Please enter contact number";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    const v = validate();
    if (v) { setError(v); return; }

    setLoading(true);
    try {
      // backend expects `quantity` (not qty) and a size/volume field
      const payload = { product: productId, quantity, size: `${size}L`, address, contact };
      await api.post("/bottle-orders", payload);
      
      // Reset form on success
      setMsg("Bottle order placed successfully");
      setQuantity(1);
      setSize("1.5");
      setAddress("");
      setContact("");
      if (products.length > 0) {
        setProductId(products[0]._id);
      }
      setTimeout(() => navigate("/user/dashboard"), 1500); // Redirect after a short delay
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Failed to place order";
      setError(errMsg);
      setTimeout(() => setError(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Place Bottle Order</h2>
      {msg && <div className="mb-3 p-2 bg-green-100 text-green-800 rounded">{msg}</div>}
      {error && <div className="mb-3 p-2 bg-red-100 text-red-800 rounded">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
      <label className="block">
          <span className="text-sm">Product</span>
          <select value={productId} onChange={(e) => setProductId(e.target.value)} className="border p-2 w-full mt-1" required>
            <option value="" disabled>-- Select a Product --</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} - ${p.price}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm">Quantity (bottles)</span>
          <input type="number" min="1" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))} className="border p-2 w-full mt-1" required />
        </label>


        <label className="block">
          <span className="text-sm">Size</span>
          <select value={size} onChange={(e) => setSize(e.target.value)} className="border p-2 w-full mt-1">
            <option value="1.5">1.5 L</option>
            <option value="2.5">2.5 L</option>
            <option value="5">5 L</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm">Delivery address</span>
          <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="border p-2 w-full mt-1" required />
        </label>

        <label className="block">
          <span className="text-sm">Contact number</span>
          <input type="tel" value={contact} onChange={(e)=>setContact(e.target.value)} className="border p-2 w-full mt-1" required />
        </label>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? "Placing..." : "Place order"}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
          <Link to="/" className="ml-auto text-sm text-blue-600 hover:underline">← Back to home</Link>
        </div>
      </form>
    </div>
  );
}