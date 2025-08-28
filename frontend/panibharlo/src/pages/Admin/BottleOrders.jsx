// src/pages/Admin/BottleOrders.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export default function BottleOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Filters
  const [q, setQ] = useState("");
  const [status, setStatus] = useState(""); // '', 'pending','assigned','delivered','cancelled'
  const [from, setFrom] = useState(""); // yyyy-mm-dd
  const [to, setTo] = useState("");     // yyyy-mm-dd

  const headers = useMemo(() => {
    const token = localStorage.getItem("token"); // admin JWT
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setErr("");
      const params = { page, limit };
      if (q) params.q = q;
      if (status) params.status = status;
      if (from) params.from = from;
      if (to) params.to = to;

      const { data } = await axios.get(`${API_BASE}/api/bottle-orders`, {
        params,
        headers,
      });

      // Expecting { orders, total }
      setOrders(data?.orders || []);
      setTotal(data?.total ?? 0);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status, headers]); // re-fetch on page or status change; for q/from/to we click "Apply" button

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleApplyFilters = () => {
    setPage(1);
    fetchOrders();
  };

  const clearFilters = () => {
    setQ("");
    setStatus("");
    setFrom("");
    setTo("");
    setPage(1);
    fetchOrders();
  };

  const updateStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      await axios.patch(
        `${API_BASE}/api/bottle-orders/${id}`,
        { deliveryStatus: newStatus },
        { headers }
      );
      // Optimistic refresh
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, deliveryStatus: newStatus } : o))
      );
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const assignDeliverer = async (id, delivererIdOrEmail) => {
    try {
      setLoading(true);
      await axios.patch(
        `${API_BASE}/api/bottle-orders/${id}`,
        { assignedTo: delivererIdOrEmail },
        { headers }
      );
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, assignedTo: delivererIdOrEmail } : o
        )
      );
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to assign deliverer");
    } finally {
      setLoading(false);
    }
  };

  const removeOrder = async (id) => {
    if (!confirm("Delete this order?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API_BASE}/api/bottle-orders/${id}`, { headers });
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to delete order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Bottle Orders</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Search (name/phone)</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g. Ali or 03xxxxxxxxx"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="md:col-span-5 flex gap-2">
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Apply
            </button>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Error / Loading */}
      {err && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
          {err}
        </div>
      )}
      {loading && (
        <div className="mb-4 p-3 rounded-lg bg-yellow-50 text-yellow-800 border border-yellow-200">
          Loading...
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-[900px] w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order #</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Assigned</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && !loading ? (
              <tr>
                <td colSpan={10} className="p-6 text-center text-gray-500">
                  No bottle orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => {
                const itemSummary =
                  o.items?.map?.((it) => `${it.size}L x ${it.quantity}`)?.join(", ") ||
                  "-";
                const created =
                  o.createdAt ? new Date(o.createdAt).toLocaleString() : "-";
                return (
                  <tr key={o._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{o.orderNumber || o._id.slice(-6)}</td>
                    <td className="p-3">{o.customerName || o.user?.name || "-"}</td>
                    <td className="p-3">{o.phone || o.user?.phone || "-"}</td>
                    <td className="p-3 max-w-[220px] truncate" title={o.address}>
                      {o.address || "-"}
                    </td>
                    <td className="p-3">{itemSummary}</td>
                    <td className="p-3">{o.totalPrice != null ? `Rs ${o.totalPrice}` : "-"}</td>
                    <td className="p-3">
                      <select
                        value={o.deliveryStatus || "pending"}
                        onChange={(e) => updateStatus(o._id, e.target.value)}
                        className="border rounded-lg px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="assigned">Assigned</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        className="border rounded-lg px-2 py-1 w-40"
                        placeholder="deliverer id/email"
                        defaultValue={o.assignedTo || ""}
                        onBlur={(e) => {
                          const val = e.target.value.trim();
                          if (val && val !== (o.assignedTo || ""))
                            assignDeliverer(o._id, val);
                        }}
                      />
                    </td>
                    <td className="p-3">{created}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => removeOrder(o._id)}
                        className="px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * limit + 1}–
          {Math.min(page * limit, total)} of {total}
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 rounded-lg border disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1 rounded-lg border bg-gray-50">
            {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 rounded-lg border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
