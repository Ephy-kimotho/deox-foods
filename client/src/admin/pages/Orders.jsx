import { useState } from "react";

const initialOrders = [
  {
    id: 1,
    product: "Burger",
    quantity: 2,
    total: 21.98,
    status: "Pending",
  },
  {
    id: 2,
    product: "Pizza",
    quantity: 1,
    total: 12.99,
    status: "Pending",
  },
  {
    id: 3,
    product: "Sushi",
    quantity: 3,
    total: 47.97,
    status: "Pending",
  },
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status:
                order.status === newStatus
                  ? getPreviousStatus(newStatus)
                  : newStatus,
            }
          : order
      )
    );
  };

  const getPreviousStatus = (currentStatus) => {
    switch (currentStatus) {
      case "Preparing":
        return "Pending";
      case "Packaged":
        return "Preparing";
      case "Delivered":
        return "Packaged";
      default:
        return "Pending";
    }
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div className="p-4 text-black bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-4 rounded-lg shadow bg-white space-y-4 sm:space-y-0"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{order.product}</h2>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
              <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
              <p
                className={`mt-2 text-sm font-medium ${
                  order.status === "Pending"
                    ? "text-yellow-600"
                    : order.status === "Preparing"
                    ? "text-blue-600"
                    : order.status === "Delivered"
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                Status: {order.status}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded text-sm ${
                  order.status === "Preparing"
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
                onClick={() => updateStatus(order.id, "Preparing")}
              >
                Preparing
              </button>
              <button
                className={`px-4 py-2 rounded text-sm ${
                  order.status === "Packaged"
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
                onClick={() => updateStatus(order.id, "Packaged")}
                disabled={order.status === "Pending"}
              >
                Packaged
              </button>
              <button
                className={`px-4 py-2 rounded text-sm ${
                  order.status === "Delivered"
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
                onClick={() => updateStatus(order.id, "Delivered")}
                disabled={order.status === "Pending" || order.status === "Preparing"}
              >
                Delivered
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
                onClick={() => handleDelete(order.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
