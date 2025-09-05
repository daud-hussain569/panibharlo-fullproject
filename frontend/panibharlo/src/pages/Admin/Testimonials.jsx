import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/testimonials");
        setItems(Array.isArray(res.data) ? res.data.map(i => ({ ...i, id: i._id })) : []);
      } catch (e) {
        setErr(e.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading testimonials...</div>;
  if (err) return <div className="text-red-600">Error: {err}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
      {items.length === 0 ? (
        <div>No testimonials found.</div>
      ) : (
        <ul className="space-y-3">
          {items.map(t => (
            <li key={t.id} className="p-3 border rounded bg-white">
              <div className="font-semibold">{t.name || t.author || "Anonymous"}</div>
              <div className="text-sm text-gray-700">{t.message || t.text || t.comment}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}