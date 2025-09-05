import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBox, FaTint, FaTruck, FaCog, FaSignOutAlt } from "react-icons/fa";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center p-3 rounded-lg transition-colors ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <div className="w-64 bg-white h-screen shadow-md flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">PaniBharlo</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        <NavLink to="/admin/dashboard" className={navLinkClasses}><FaTachometerAlt className="mr-3" /> Dashboard</NavLink>
        <NavLink to="/admin/users" className={navLinkClasses}><FaUsers className="mr-3" /> Users</NavLink>
        <NavLink to="/admin/products" className={navLinkClasses}><FaBox className="mr-3" /> Products</NavLink>
        <NavLink to="/admin/bottle-orders" className={navLinkClasses}><FaTint className="mr-3" /> Bottle Orders</NavLink>
        <NavLink to="/admin/tanker-orders" className={navLinkClasses}><FaTruck className="mr-3" /> Tanker Orders</NavLink>
        <NavLink to="/admin/settings" className={navLinkClasses}><FaCog className="mr-3" /> Settings</NavLink>
      </nav>
      <div className="p-4 border-t">
        <button onClick={handleLogout} className="w-full flex items-center p-3 rounded-lg text-red-500 hover:bg-red-100">
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </div>
    </div>
  );
};

export default function AdminLayout() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet /> {/* Child routes will render here */}
      </main>
    </div>
  );
}
