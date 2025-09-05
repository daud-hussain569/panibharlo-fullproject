// src/api/authProvider.js
import axios from "axios";

const authProvider = {
  // Login with email and password
  login: async ({ username, password }) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email: username,
        password,
      });

      // Save token and role to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err.response?.data?.message || "Login failed");
    }
  },

  // Logout by removing token and role
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return Promise.resolve();
  },

  // Check if user is authenticated
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },

  // Handle errors (required by react-admin)
  checkError: (error) => {
    // You can add logic for 401/403 errors if needed
    return Promise.resolve();
  },

  // Get user permissions / role
  getPermissions: () => {
    const role = localStorage.getItem("role");
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
