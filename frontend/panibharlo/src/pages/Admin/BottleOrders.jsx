import React, { useState, useEffect } from "react";
import api from "../../api/axios";

export default function BottleOrders() {
  const [bottleOrders, setBottleOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [deliverers, setDeliverers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrdersAndDeliverers = async () => {
      try {
        setLoading(true);
        const [ordersRes, usersRes, productsRes] = await Promise.all([
          api.get("/bottle-orders"),
          api.get("/users"),
          api.get("/products"), // Fetch products
        ]);

        setBottleOrders(ordersRes.data.map((o) => ({ ...o, id: o._id || o.id })));
        setDeliverers(usersRes.data.filter(u => u.role === 'deliverer'));
        setProducts(productsRes.data); // Store the fetched products
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch data"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrdersAndDeliverers();
  }, []);

  const handleAddOrder = async () => {
    // Create a dropdown for product selection
    const productOptions = products.map(p => `${p._id}:${p.name} - Rs.${p.price}`).join('\\n');
    const selectedProduct = window.prompt(`Select a product:\\n${productOptions}`);
    if (!selectedProduct) return;

    const productId = selectedProduct.split(':')[0];

    // For simplicity, we'll create a dummy user for admin-created orders
    // A better approach would be to select an existing user.
    const userName = window.prompt("Enter customer name:", "Guest");
    if (!userName) return;

    const phone = window.prompt("Enter customer phone:");
    const address = window.prompt("Enter customer address:");
    const quantity = window.prompt("Enter quantity:");

    if (!productId || !phone || !address || !quantity || isNaN(quantity)) {
      alert("Product, phone, address, and a numeric quantity are required.");
      return;
    }

    try {
      // Note: The backend expects a 'user' ID. For admin-created orders for non-registered
      // users, the backend logic might need adjustment. Here, we're sending what the
      // controller expects, but the `user` field might be an issue if not handled.
      // For now, we'll send the required fields for the order itself.
      const res = await api.post("/bottle-orders", {
        product: productId,
        // We are creating an order for a "guest" user.
        // The backend `createBottleOrder` uses `req.user._id`, so this will be
        // attributed to the currently logged-in admin.
        // We'll add customerName and phone to the order details.
        customerDetails: { name: userName, phone },
        address,
        contact: phone,
        quantity: Number(quantity),
      });
      const newOrder = { ...res.data, id: res.data._id || res.data.id };
      setBottleOrders((prevOrders) => [newOrder, ...prevOrders]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add order");
    }
  };

  const handleDeleteOrder = async (idToDelete) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await api.delete(`/bottle-orders/${idToDelete}`);
      setBottleOrders((currentOrders) => currentOrders.filter((order) => order.id !== idToDelete));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete order");
    }
  };

  const handleUpdateStatus = async (order) => {
    const newStatus = window.prompt("Update status (pending, delivered, cancelled):", order.status);
    if (!newStatus || newStatus === order.status) return;

    try {
      const res = await api.put(`/bottle-orders/${order.id}`, { status: newStatus });
      const updatedOrder = { ...res.data, id: res.data._id || res.data.id };
      setBottleOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === order.id ? updatedOrder : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order status");
    }
  };

  const handleAssignDeliverer = async (orderId, delivererId) => {
    if (!delivererId) return;
    try {
      const res = await api.put(`/bottle-orders/${orderId}/assign`, { delivererId });
      const updatedOrder = { ...res.data, id: res.data._id || res.data.id };
      setBottleOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === orderId ? updatedOrder : o))
      );
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to assign deliverer"
      );
    }
  };


  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Bottle Orders</h1>
        <button
          onClick={handleAddOrder}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Add New Order
        </button>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Customer</th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Quantity</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Assign To</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bottleOrders.map((order) => (
              <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div>{order.user?.name || order.customerDetails?.name || 'N/A'}</div>
                  <div className="text-xs text-gray-500">{order.contact || order.user?.email}</div>
                </td>
                <td className="px-6 py-4">
                  {order.product?.name || 'N/A'}
                </td>
                <td className="px-6 py-4">{order.quantity}</td>
                <td className="px-6 py-4 capitalize">{order.status}</td>
                <td className="px-6 py-4">
                  <select
                    value={order.deliverer?._id || ""}
                    onChange={(e) => handleAssignDeliverer(order.id, e.target.value)}
                    className="p-1 border rounded bg-white"
                    disabled={order.status === 'delivered'}
                  >
                    <option value="">Unassigned</option>
                    {deliverers.map(d => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <button onClick={() => handleUpdateStatus(order)} className="font-medium text-blue-600 hover:underline">Update Status</button>
                  <button onClick={() => handleDeleteOrder(order.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}