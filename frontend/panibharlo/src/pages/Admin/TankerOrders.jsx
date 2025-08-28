import React, { useEffect, useState } from "react";
import axios from "axios";

function TankerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [statusFilter, setStatusFilter] = useState("");
  const [driverFilter, setDriverFilter] = useState("");

  // Fetch orders from backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/tanker-orders?page=${page}&status=${statusFilter}&driver=${driverFilter}`);
      setOrders(res.data.orders || []);
      setTotalPages(res.data.totalPages || 1);
      setErr(null);
    } catch (error) {
      setErr("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, driverFilter]);

  // Filters
  const handleApplyFilters = () => {
    setPage(1);
    fetchOrders();
  };

  const clearFilters = () => {
    setStatusFilter("");
    setDriverFilter("");
    setPage(1);
    fetchOrders();
  };

  // Update status
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/admin/tanker-orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (error) {
      alert("Error updating status");
    }
  };

  // Assign driver
  const assignDriver = async (orderId, driverId) => {
    try {
      await axios.put(`/api/admin/tanker-orders/${orderId}/assign`, { driverId });
      fetchOrders();
    } catch (error) {
      alert("Error assigning driver");
    }
  };

  // Delete order
  const removeOrder = async (orderId) => {
    try {
      await axios.delete(`/api/admin/tanker-orders/${orderId}`);
      fetchOrders();
    } catch (error) {
      alert("Error deleting order");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Tanker Orders</h2>

      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="delivered">Delivered</option>
        </select>

        <input
          type="text"
          placeholder="Driver ID"
          value={driverFilter}
          onChange={(e) => setDriverFilter(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply
        </button>

        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {/* Loading & Error */}
      {loading && <p>Loading...</p>}
      {err && <p className="text-red-500">{err}</p>}

      {/* Orders Table */}
      {!loading && !err && (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Driver</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="p-2 border">{order.customerName}</td>
                  <td className="p-2 border">{order.deliveryStatus}</td>
                  <td className="p-2 border">{order.assignedTo || "Unassigned"}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => updateStatus(order._id, "delivered")}
                      className="px-2 py-1 bg-green-600 text-white rounded"
                    >
                      Mark Delivered
                    </button>
                    <button
                      onClick={() => assignDriver(order._id, "driver123")}
                      className="px-2 py-1 bg-yellow-600 text-white rounded"
                    >
                      Assign Driver
                    </button>
                    <button
                      onClick={() => removeOrder(order._id)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TankerOrders;
