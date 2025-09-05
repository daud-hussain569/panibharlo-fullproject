import React from "react";

const STATUS_CLASSES = {
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  in_transit: "bg-yellow-100 text-yellow-800",
  dispatched: "bg-yellow-100 text-yellow-800",
  pending: "bg-blue-100 text-blue-800",
};

export default function OrderCard({ order, index, onRefresh }) {
  // use explicit colors by order.type (bottle -> blue, tanker -> teal)
  const bg =
    order.type === "tanker"
      ? "bg-teal-50"
      : order.type === "bottle"
      ? "bg-blue-50"
      : ["bg-blue-50", "bg-green-50", "bg-yellow-50", "bg-pink-50", "bg-purple-50", "bg-teal-50"][index % 6];

  const title = order.type === "tanker" ? "Tanker Order" : "Bottle Order";
  const when = order.createdAt ? new Date(order.createdAt).toLocaleString() : "—";
  const details =
    order.type === "tanker"
      ? `Volume: ${order.volume ?? "—"} L`
      : `Quantity: ${order.quantity ?? "—"} ${order.size ? `(${order.size})` : ""}`;

  const statusKey = (order.status || "pending").toString().toLowerCase();
  const statusClass = STATUS_CLASSES[statusKey] || STATUS_CLASSES.pending;

  return (
    <div className={`p-4 rounded-lg shadow-sm border ${bg}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-600">{title}</div>
          <div className="font-semibold text-lg">{order.userName || order.customer || "You"}</div>
          <div className="text-sm text-gray-700 mt-1">{details}</div>
          <div className="text-xs text-gray-500 mt-1">{order.address}</div>
        </div>

        <div className="text-right">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>
            {order.status || "pending"}
          </div>
          <div className="text-xs text-gray-500 mt-2">{when}</div>
          <div className="mt-3">
            <button
              onClick={() => onRefresh && onRefresh()}
              className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}