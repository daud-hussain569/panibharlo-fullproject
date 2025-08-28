import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-t">
              <td className="px-4 py-2">{u._id}</td>
              <td className="px-4 py-2">{u.name}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
