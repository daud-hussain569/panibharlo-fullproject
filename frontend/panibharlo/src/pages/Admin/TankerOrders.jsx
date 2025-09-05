import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function TankerOrders() {
  const [orders, setOrders] = useState([]);
  const [deliverers, setDeliverers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [ordersRes, usersRes] = await Promise.all([
          api.get("/tanker-orders"), // backend: /api/tanker-orders
          api.get("/users"),
        ]);

        const ordersData = Array.isArray(ordersRes.data) ? ordersRes.data.map(o => ({ ...o, id: o._id })) : [];
        setOrders(ordersData);

        const deliverersData = usersRes.data.filter(u => u.role === 'deliverer');
        setDeliverers(deliverersData);

      } catch (e) {
        setErr(e.response?.data?.message || e.message || "Failed to load tanker orders");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAssignDeliverer = async (orderId, delivererId) => {
    if (!delivererId) return; // Do nothing if "Unassigned" is selected
    try {
      const res = await api.put(`/tanker-orders/${orderId}/assign`, { delivererId });
      const updatedOrder = { ...res.data, id: res.data._id };
      setOrders(prevOrders =>
        prevOrders.map(o => (o.id === orderId ? updatedOrder : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to assign deliverer");
    }
  };

  if (loading) return <div>Loading tanker orders...</div>;
  if (err) return <div className="text-red-600">Error: {err}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tanker Orders</h2>

      {orders.length === 0 ? (
        <div>No tanker orders found.</div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Volume (L)</th>
                <th className="p-2 text-left">Truck</th>
                <th className="p-2 text-left">Delivery Date</th>
                <th className="p-2 text-left">Address</th>
                <th className="p-2 text-left">Contact</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Assign To</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, idx) => (
                <tr key={o.id} className="border-t">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{o.user?.name || o.name || "—"}</td>
                  <td className="p-2">{o.volume ?? o.qty ?? "—"}</td>
                  <td className="p-2">{o.truckType || "—"}</td>
                  <td className="p-2">{o.deliveryDate ? new Date(o.deliveryDate).toLocaleDateString() : "—"}</td>
                  <td className="p-2">{o.address}</td>
                  <td className="p-2">{o.contact}</td>
                  <td className="p-2">{o.status || "pending"}</td>
                  <td className="p-2">
                    <select
                      value={o.deliverer?._id || ""}
                      onChange={(e) => handleAssignDeliverer(o.id, e.target.value)}
                      className="p-1 border rounded bg-white"
                      disabled={o.status === 'delivered'}
                    >
                      <option value="">Unassigned</option>
                      {deliverers.map(d => (
                        <option key={d._id} value={d._id}>{d.name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
