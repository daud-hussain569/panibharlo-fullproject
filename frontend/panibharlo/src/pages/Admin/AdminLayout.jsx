import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded mb-2 hover:bg-gray-700 transition ${
      isActive ? "bg-gray-700 font-semibold" : ""
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Pani Bharlo Admin</h2>
        <nav className="flex-1">
          <NavLink to="dashboard" className={linkClasses}>Dashboard</NavLink>
          <NavLink to="users" className={linkClasses}>Users</NavLink>
          <NavLink to="products" className={linkClasses}>Products</NavLink>
          <NavLink to="bottle-orders" className={linkClasses}>Bottle Orders</NavLink>
          <NavLink to="tanker-orders" className={linkClasses}>Tanker Orders</NavLink>
          <NavLink to="settings" className={linkClasses}>Settings</NavLink>
        </nav>
        <div className="mt-auto">
          <button
            className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
