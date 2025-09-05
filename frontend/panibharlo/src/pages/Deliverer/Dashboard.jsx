import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");

export default function DelivererDashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    if (!stored || role !== "deliverer") {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(stored);
    const currentUser = userData.user || userData; // Handle nested user object
    setUser(currentUser);

    // Register deliverer with socket server
    socket.emit("register", currentUser._id || currentUser.id);
  }, [navigate]);

  const fetchAssigned = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [bRes, tRes] = await Promise.allSettled([
        api.get("/bottle-orders/deliverer"),
        api.get("/tanker-orders/deliverer"),
      ]);
      const unwrap = (r) =>
        r.status === "fulfilled" && Array.isArray(r.value.data)
          ? r.value.data
          : [];

      const bottleOrders = unwrap(bRes);
      const tankerOrders = unwrap(tRes);

      const assigned = [
        ...bottleOrders.map((o) => normalize(o, "bottle")),
        ...tankerOrders.map((o) => normalize(o, "tanker")),
      ];

      assigned.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
      setOrders(assigned);
    } catch (err) {
      console.error("Failed to fetch assigned orders", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const normalize = (o, type) => ({
    id: o._id || o.id,
    type,
    createdAt:
      o.createdAt || o.deliveryDate || o.created_at || o.created || null,
    address: o.address || o.deliveryAddress || o.area || o.location || "—",
    area: o.area || o.location || null,
    status: o.status || o.orderStatus || "pending",
    quantity: o.quantity ?? o.qty ?? o.volume ?? null,
    user: o.user,
    product: o.product,
    raw: o,
  });


  useEffect(() => {
    if (!user) return;
    fetchAssigned();

    // Listen for new orders assigned to any deliverer
    // A more advanced implementation would have the backend emit an event only to the specific deliverer
    const handleNewOrder = () => {
      // We can just refetch all orders as new assignments are less frequent
      fetchAssigned();
    };

    const handleOrderStatusUpdate = (updatedOrder) => {
      // Find the order in the current state and update it
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === updatedOrder._id ? normalize(updatedOrder, o.type) : o
        )
      );
    };

    const handleNewAssignedOrder = (newOrder) => {
      // Add the newly assigned order to the top of the list
      setOrders((prevOrders) => [normalize(newOrder, newOrder.truckType ? 'tanker' : 'bottle'), ...prevOrders]);
    };

    socket.on("new_bottle_order", handleNewOrder);
    socket.on("new_tanker_order", handleNewOrder);
    socket.on("order_status_update", handleOrderStatusUpdate);
    socket.on("new_assigned_order", handleNewAssignedOrder);

    return () => {
      socket.off("new_bottle_order", handleNewOrder);
      socket.off("new_tanker_order", handleNewOrder);
      socket.off("order_status_update", handleOrderStatusUpdate);
      socket.off("new_assigned_order", handleNewAssignedOrder);
    };
  }, [user, fetchAssigned]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const total = orders.length;
  const byStatus = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-20">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Deliverer dashboard</h2>
            <div className="text-sm text-gray-600">
              Hello, {user.name || user.email}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{total} orders</div>
            <div className="text-sm text-gray-600">Assigned to you</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold">{total}</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-600">In progress</div>
            <div className="text-2xl font-bold">
              {byStatus.in_transit || byStatus.dispatched || 0}
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-600">Delivered</div>
            <div className="text-2xl font-bold">{byStatus.delivered || 0}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          {/* Header with logout button */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Assigned orders</h3>
         <button
  onClick={handleLogout}
  className="ml-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
>
  Logout
</button>
          </div>

          {loading ? (
            <div>Loading assigned orders...</div>
          ) : orders.length === 0 ? (
            <div>No assigned orders.</div>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="p-3 border rounded flex justify-between items-start"
                >
                  <div>
                    <div className="text-sm text-gray-500">
                      {o.type === "tanker" ? "Tanker" : "Bottle"}
                    </div>
                    <div className="font-medium">{o.quantity ?? "—"}</div>
                    <div className="text-sm text-gray-600">{o.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{o.status}</div>
                    <div className="text-xs text-gray-500">
                      {o.createdAt
                        ? new Date(o.createdAt).toLocaleString()
                        : "—"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
