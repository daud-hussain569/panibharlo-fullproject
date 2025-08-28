import React, { useState } from "react";
import axios from "axios";

function Settings() {
  const [password, setPassword] = useState("");

  const handleChangePassword = () => {
    axios
      .put("/api/admin/change-password", { password })
      .then((res) => {
        alert(res.data?.message || "Password updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update password. Please try again.");
      });
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <input
        type="password"
        placeholder="New Password"
        className="w-full mb-4 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleChangePassword}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Update Password
      </button>
    </div>
  );
}

export default Settings;
