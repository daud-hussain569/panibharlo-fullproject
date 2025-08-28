import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({ users: 0, products: 0, bottleOrders: 0, tankerOrders: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => setError(err.response?.data?.message || "Failed to fetch stats"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const chartData = {
    labels: ["Users", "Products", "Bottle Orders", "Tanker Orders"],
    datasets: [{
      label: "Counts",
      data: [stats.users, stats.products, stats.bottleOrders, stats.tankerOrders],
      backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Users</h3>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Products</h3>
          <p className="text-2xl font-bold">{stats.products}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Bottle Orders</h3>
          <p className="text-2xl font-bold">{stats.bottleOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Tanker Orders</h3>
          <p className="text-2xl font-bold">{stats.tankerOrders}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-gray-700 text-lg font-semibold mb-4">Overview</h3>
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
    </div>
  );
}

export default Dashboard;
