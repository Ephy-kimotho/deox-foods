import { useState, useEffect } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/orders");
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error("API response is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`/api/orders/${id}`, { status: newStatus });
      setOrders(orders.map((order) => (order.id === id ? { ...order, status: response.data.status } : order)));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  return (
    <div className="px-20 text-black bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Orders</h1>
      {loading ? (
  <p>Loading orders...</p>
) : (
  Array.isArray(orders) && orders.length > 0 ? (
    orders.map((order) => (
      <div key={order.id} className="border p-4 rounded-lg shadow bg-white">
        {/* Order display */}
      </div>
    ))
  ) : (
    <p>No orders available or invalid data format</p>
  )
)}

<div className="space-y-4">
  {Array.isArray(orders) && orders.length > 0 ? (
    orders.map((order) => (
      <div key={order.id} className="border p-4 rounded-lg shadow bg-white">
        <h2 className="text-lg font-semibold">{order.product}</h2>
        <p className="text-gray-600">Quantity: {order.quantity}</p>
        <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
        <p className={`mt-2 text-sm font-medium text-${order.status === "Pending" ? "yellow" : "green"}-600`}>
          Status: {order.status}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => updateStatus(order.id, "Preparing")}
        >
          Preparing
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => deleteOrder(order.id)}
        >
          Delete
        </button>
      </div>
    ))
  ) : (
    <p>No orders available or invalid data format</p>
  )}
</div>

    </div>
  );
}
