import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if(data.role === "admin" || data.role === "superadmin") {
        localStorage.setItem("token", data.token);
        navigate("/admin/dashboard");
      } else {
        alert("Not authorized");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2"
               value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-4"
               value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 w-full rounded">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
