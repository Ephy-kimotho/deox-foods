import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function RestaurantOwner() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch orders for the specific restaurant
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders"); // add the API endpoints here
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    // fetchOrders();
  }, []);

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 p-5 mt-20 pb-6">
      <h2 className="text-3xl font-bold text-night-200 dark:text-neutral-300 text-center capitalize underline mb-4">
        Your restaurant orders.
      </h2>

      {loading ? (
        <div className="h-4/5 flex flex-col gap-4 justify-center items-center">
          <h3 className="text-3xl text-night-200 font-openSans dark:text-neutral-300 ">
            Loading your orders...
          </h3>
          <ScaleLoader height={60} width={5} color="#f57710" />
        </div>
      ) : (
        <div className="min-h-[90%]  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.length === 0 ? (
            <p className="col-span-full text-center">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold">{order.customerName}</h3>
                <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                <p className="text-sm text-gray-600">Total: ${order.total}</p>
                <p className="mt-2 text-sm">{order.status}</p>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default RestaurantOwner;
