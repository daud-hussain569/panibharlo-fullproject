import React, { useEffect, useState } from "react";
import api from "../../api/axios"; // axios instance
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF6384", "#6A33F2"];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Don't show loading indicator on subsequent fetches
        if (!stats) setLoading(true);

        const [sRes, uRes, pRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/users"),
          api.get("/products"), // Fetch products
        ]);

        setStats(sRes.data);
        setUsers(uRes.data.map((u) => ({ ...u, id: u._id })));
        setProducts(pRes.data.map((p) => ({ ...p, id: p._id })));
        setErr(""); // Clear previous errors on successful fetch
      } catch (e) {
        setErr(
          e.response?.data?.message ||
            e.message ||
            "Failed to load dashboard data"
        );
        console.error("Dashboard fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 10000); // Refetch every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (err) return <div className="text-red-600">Error: {err}</div>;

  // ---------------- PIE DATA ----------------
  const userCountByRole = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(userCountByRole).map(([name, value]) => ({
    name,
    value,
  }));

  // ---------------- BAR + LINE DATA ----------------
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthlyUsers = stats?.monthlyUsers || [];
  const monthlyBottleOrders = stats?.monthlyBottleOrders || [];
  const monthlyTankerOrders = stats?.monthlyTankerOrders || [];

  // Map backend arrays (where _id is the month number) into a lookup object
  const userMap = Object.fromEntries(monthlyUsers.map((m) => [m._id, m.count]));
  const bottleMap = Object.fromEntries(
    monthlyBottleOrders.map((m) => [m._id, m.count])
  );
  const tankerMap = Object.fromEntries(
    monthlyTankerOrders.map((m) => [m._id, m.count])
  );

  // Merge into single dataset for recharts
  const lineData = months.map((monthName, index) => ({
    month: monthName,
    users: userMap[index + 1] || 0, // month is 1-based
    bottleOrders: bottleMap[index + 1] || 0,
    tankerOrders: tankerMap[index + 1] || 0,
  }));

  // ---------------- UI ----------------
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PIE CHART */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Users by role</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map((entry, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Monthly Orders</h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={lineData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bottleOrders" stackId="a" fill="#8884d8" />
                <Bar dataKey="tankerOrders" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* LINE CHART FULL WIDTH */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Monthly Activity</h3>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={3} />
              <Line type="monotone" dataKey="bottleOrders" stroke="#8884d8" strokeWidth={3} />
              <Line type="monotone" dataKey="tankerOrders" stroke="#ff7300" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT PRODUCTS */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Recent Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">₹{p.price}</td>
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2 space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
