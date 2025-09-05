// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Public Pages / Components
import Home from "./pages/Home.jsx";
import Products from "./components/Products"; // public products page
import Contact from "./components/Contact"; // <-- Import the Contact component
import AdminLogin from "./pages/Admin/Login.jsx";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard.jsx";
import Users from "./pages/Admin/Users";
import AdminProducts from "./pages/Admin/Products"; // admin-only products page
import BottleOrders from "./pages/Admin/BottleOrders";
import TankerOrders from "./pages/Admin/TankerOrders";
import Testimonials from "./pages/Admin/Testimonials";
import Comments from "./pages/Admin/Comments"; // <-- Add this import

// User Pages
import UserLogin from "./pages/User/Login.jsx";
import UserDashboard from "./pages/User/UserDashboard";
import Register from "./pages/User/Register.jsx";
import BottleOrderForm from "./pages/User/BottleOrderForm.jsx";
import TankerOrderForm from "./pages/User/TankerOrderForm.jsx";

// Deliverer Pages
import DelivererDashboard from "./pages/Deliverer/Dashboard.jsx";
import Settings from "./pages/Admin/Settings";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Context
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/contact" element={<Contact />} /> {/* <-- Add the route for the contact page */}
        <Route path="/register" element={<Register />} />

        {/* User protected routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/order/bottle" element={<BottleOrderForm />} />
        <Route path="/order/tanker" element={<TankerOrderForm />} />

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin protected area */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin" roles={["admin", "superadmin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="bottle-orders" element={<BottleOrders />} />
          <Route path="tanker-orders" element={<TankerOrders />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="comments" element={<Comments />} /> 
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Deliverer protected routes */}
        <Route
          path="/deliverer/dashboard"
          element={
            <ProtectedRoute role="deliverer">
              <DelivererDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-4xl">
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
