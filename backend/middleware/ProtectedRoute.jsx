import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
     // Redirect to the appropriate login page based on the protected route
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    return <Navigate to={isAdminRoute ? "/admin/login" : "/login"} replace />;
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/" replace />; // Or a dedicated "unauthorized" page
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
