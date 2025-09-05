import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function TankerOrderForm() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [volumeSelection, setVolumeSelection] = useState("1000"); // Tracks the dropdown
  const [customVolume, setCustomVolume] = useState(""); // Tracks the custom input
  const [truckType, setTruckType] = useState("medium");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Assuming you have a way to distinguish tanker products,
        // e.g., by name or a new 'type' field in the Product model.
        // For now, we fetch all and let the user choose.
        const { data } = await api.get("/products");
        setProducts(data); // You might want to filter these for tankers
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
    const volume = volumeSelection === "custom" ? Number(customVolume) : Number(volumeSelection);
    if (!productId) return "Please select a product.";
    if (!address.trim()) return "Please enter delivery address";
    if (!contact.trim()) return "Please enter contact number";
    if (volume <= 0) return "Volume must be greater than 0";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg(""); setError("");
    const v = validate();
    if (v) { setError(v); return; }

    setLoading(true);
    try {
      const finalVolume = volumeSelection === "custom" ? Number(customVolume) : Number(volumeSelection);
      const payload = {
        product: productId,
        volume: finalVolume,
        truckType,
        deliveryDate: deliveryDate || null,
        address,
        contact
      };
      await api.post("/tanker-orders", payload);
      setMsg("Tanker order placed successfully");
      setTimeout(() => navigate("/user/dashboard"), 1500); // Redirect after a short delay
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Failed to place tanker order";
      setError(errMsg);
      setTimeout(() => setError(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Place Tanker Order</h2>
      {msg && <div className="mb-3 p-2 bg-green-100 text-green-800 rounded">{msg}</div>}
      {error && <div className="mb-3 p-2 bg-red-100 text-red-800 rounded">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className="text-sm">Product</span>
          <select value={productId} onChange={(e) => setProductId(e.target.value)} className="w-full border p-2 mt-1" required>
            <option value="" disabled>-- Select a Product --</option>
            {products.map((p) => (
              // You might want to filter here to only show 'tanker' products
              <option key={p._id} value={p._id}>
                {p.name} - ${p.price}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm">Volume (litres)</span>
          <select value={volumeSelection} onChange={(e) => setVolumeSelection(e.target.value)} className="w-full border p-2 mt-1">
            <option value="1000">1000 L</option>
            <option value="2000">2000 L</option>
            <option value="5000">5000 L</option>
            <option value="custom">Custom</option>
          </select>
          {volumeSelection === "custom" && (
            <input type="number" min="1" value={customVolume} onChange={(e) => setCustomVolume(e.target.value)} className="border p-2 w-full mt-2" placeholder="Enter custom litres" required />
          )}
        </label>

        <label className="block">
          <span className="text-sm">Truck type</span>
          <select value={truckType} onChange={(e) => setTruckType(e.target.value)} className="border p-2 w-full mt-1">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm">Delivery date (optional)</span>
          <input type="date" value={deliveryDate} onChange={(e)=>setDeliveryDate(e.target.value)} className="border p-2 w-full mt-1" />
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
            {loading ? "Placing..." : "Place tanker order"}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
          <Link to="/" className="ml-auto text-sm text-blue-600 hover:underline">← Back to home</Link>
        </div>
      </form>
    </div>
  );
}