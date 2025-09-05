import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import OrderCard from "../../components/OrderCard";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!storedUser || role !== "user") {
      navigate("/login");
      return;
    }

    // Ensure we get the nested user object if it exists
    const userData = JSON.parse(storedUser);
    const currentUser = userData.user || userData;
    setUser(currentUser);

    // Register user with socket server
    socket.emit("register", currentUser._id || currentUser.id);

  }, [navigate]);

  const normalize = (o, type) => ({
    id: o._id || o.id,
    type,
    quantity: o.quantity ?? o.qty ?? o.qtyOrdered ?? null,
    size: o.size ?? o.sizeLabel ?? o.volumeSize ?? null,
    volume: o.volume ?? o.litres ?? null,
    address: o.address || o.deliveryAddress || "—",
    contact: o.contact || o.phone || "—",
    status: o.status || o.orderStatus || "pending",
    createdAt: o.createdAt || o.created_at || o.created,
    userId: (o.user && (o.user._id || o.user)) || o.userId || null,
    userName: (o.user && (o.user.name || o.userName)) || o.name || null,
    raw: o,
  });

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setLoadingOrders(true);
    try {
      // ✅ Fetch orders only for this user (if backend supports it)
      const [bRes, tRes] = await Promise.allSettled([
        api.get(`/bottle-orders/my-orders`),
        api.get(`/tanker-orders/my-orders`),
      ]);

      const unwrap = (r) =>
        r.status === "fulfilled" && Array.isArray(r.value.data)
          ? r.value.data
          : [];

      const bottleOrders = unwrap(bRes);
      const tankerOrders = unwrap(tRes);

      const all = [
        ...bottleOrders.map((o) => normalize(o, "bottle")),
        ...tankerOrders.map((o) => normalize(o, "tanker")),
      ];

      // sort newest first
      all.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

      setOrders(all);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoadingOrders(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetchOrders();

    // Listen for new orders
    const handleNewBottleOrder = (newOrder) => {
      setOrders((prevOrders) => [normalize(newOrder, "bottle"), ...prevOrders]);
    };
    const handleNewTankerOrder = (newOrder) => {
      setOrders((prevOrders) => [normalize(newOrder, "tanker"), ...prevOrders]);
    };

    const handleOrderStatusUpdate = (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === updatedOrder._id ? normalize(updatedOrder, o.type) : o
        )
      );
    };

    socket.on("new_bottle_order", handleNewBottleOrder);
    socket.on("new_tanker_order", handleNewTankerOrder);
    // Listen for status updates
    socket.on("order_status_update", handleOrderStatusUpdate);

    return () => {
      // Clean up listeners
      socket.off("new_bottle_order", handleNewBottleOrder);
      socket.off("new_tanker_order", handleNewTankerOrder);
      socket.off("order_status_update", handleOrderStatusUpdate);
    };
  }, [user, fetchOrders]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome, {user.name || "User"} 👋
        </h1>

        <p className="text-gray-700 mb-6">
          This is your user dashboard. From here, you can view your account
          details, track orders, and manage settings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h2 className="font-bold mb-2">Profile Info</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg shadow">
            <h2 className="font-bold mb-2">Orders</h2>
            <p>
              You have {orders.length} order
              {orders.length !== 1 ? "s" : ""}.
            </p>
          </div>
        </div>

        <div className="space-y-6 p-6 bg-gray-50 rounded">
          <h2 className="text-xl font-semibold">Your Orders</h2>

          {loadingOrders ? (
            <div>Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-gray-600">
              You have no orders yet. Browse{" "}
              <Link to="/products" className="text-blue-600">
                products
              </Link>
              .
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((o, idx) => (
                <OrderCard
                  key={o.id}
                  order={o}
                  index={idx}
                  onRefresh={fetchOrders}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            to="/products"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Browse Products
          </Link>
          <Link to="/order/bottle" className="px-4 py-2 border rounded">
            Place Bottle Order
          </Link>
          <Link to="/order/tanker" className="px-4 py-2 border rounded">
            Place Tanker Order
          </Link>
          <button
            onClick={handleLogout}
            className="ml-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
