// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import About from "./components/About";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import Login from "./pages/Login"; 

// Admin Pages
import AdminLogin from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import BottleOrders from "./pages/Admin/BottleOrders";
import TankerOrders from "./pages/Admin/TankerOrders";
import Settings from "./pages/Admin/Settings";
import AdminLayout from "./pages/Admin/AdminLayout"; // Layout wrapper

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Pages with Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="bottle-orders" element={<BottleOrders />} />
        <Route path="tanker-orders" element={<TankerOrders />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 Fallback */}
      <Route
        path="*"
        element={<div className="p-10 text-center">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
