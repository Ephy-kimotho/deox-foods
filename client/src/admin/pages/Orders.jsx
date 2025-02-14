import { useState, useEffect } from "react";
import axios from "axios";
import { getAllOrders } from "../services/api";
import { useToken } from "../../components/AuthProvider";
import { BASE_URL } from "../../utils/utils";
import toast, { Toaster } from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useToken(); // Retrieve token from context

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getAllOrders(token); // Pass token

        // Extract paid_orders from response
        if (response.paid_orders) {
          setOrders(response.paid_orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  const updateStatus = async (orderNo) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/restaurant/update-delivery-status/${orderNo}/`,
        { delivery_status: "packed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.statusText === "OK") {
        toast.success("Status updated.");
      }

      // Update the local state to reflect the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_no === orderNo
            ? { ...order, delivery_status: "packed" }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="md:mt-16 text-black bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-left text-blue-600">
        Orders
      </h1>

      <Toaster position="top-center" />

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.order_no}
              className="border p-4 rounded-lg shadow bg-white"
            >
              <h2 className="text-lg font-semibold">
                Order No: {order.order_no}
              </h2>
              {order.order_items.map((item, index) => (
                <div key={index} className="mt-2">
                  <p className="text-gray-600">Product: {item.product_name}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">
                    Total: Ksh {item.total.toFixed(2)}
                  </p>
                </div>
              ))}

              <p className={`my-2 text-sm font-medium text-green-600`}>
                Payment Status: {order.payment_status ? "Paid" : "Unpaid"}
              </p>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                onClick={() => updateStatus(order.order_no)}
              >
                Update Order to Packed
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
}

export default Orders;
