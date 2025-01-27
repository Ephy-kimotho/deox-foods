/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import OrderStatus from "./OrderStatus";
import OrderDetails from "./OrderDetails";
import axios from "axios";

const fakeorders = [
  {
    orderId: 1,
    name: "Rice beans",
    price: 100,
    quantity: 1,
  },
  {
    orderId: 2,
    name: " 4 Chapati's lentils",
    price: 150,
    quantity: 1,
  },
  {
    orderId: 3,
    name: "Ugali beef",
    price: 130,
    quantity: 3,
  },
];

const MyOrders = ({ orderId }) => {
  const [latestOrder, setLatestOrder] = useState(); // Track all orders
  const [pastOrders, setPastOrders] = useState(fakeorders); // Get past orders
  const [isLoading, setIsLoading] = useState(false); // Track errors

  /* GET THE LATEST ORDER STATUS */
  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}/status/`);

        console.log(response);
        const data = response.data;
        setLatestOrder({
          orderId,
          stage: data.currentStage,
          dateTime: data.dateTime,
        });
      } catch (err) {
        console.log("Error geting the latest order status: ", err);
      }
    };

    if (orderId) {
      fetchOrderStatus();
    }
  }, [orderId]);

  /* GET PAST ORDERS  */
  useEffect(() => {
    const fetchPastOrders = async () => {
      setIsLoading(true);
      try {
        // REPLACE WITH REAL API
        //const res = axios.get("api/orders");
        const res = await new Promise((resolve) =>
          setTimeout(() => {
            resolve("PAST ORDERS SENT");
          }, 1000)
        );
        console.log(res);
        //const data = res.data;
        //setPastOrders(data);
      } catch (error) {
        console.error("Error getting past orders: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPastOrders();
  }, []);

  const pastOrdersExist = pastOrders?.length !== 0;

  if (isLoading) {
    return (
      <div className="p-24 min-h-screen flex-grow bg-zinc-200 dark:bg-night-200 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-4 w-[330px] sm:w-[512px] bg-white py-6  rounded-md shadow-md">
          <p className="uppercase font-bold text-blue-600 tracking-wider text-base sm:text-3xl">
            Loading past orders...
          </p>
          <BeatLoader size={20} color="#f57710" />
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders pt-28 px-4 min-h-screen flex-grow bg-zinc-200 dark:bg-night-200">
      {/* LATEST ORDER SECTION */}
      {latestOrder && (
        <div className="mb-8 p-4  bg-white rounded-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
            Latest Order
          </h2>
          <OrderStatus stage={latestOrder.stage} />
          <OrderDetails
            stage={latestOrder.stage}
            dateTime={latestOrder.dateTime}
          />
        </div>
      )}

      {/* PAST ORDERS SECTION */}
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
          My Orders
        </h2>
        {!pastOrdersExist ? (
          <p className="text-gray-600">No past orders.</p>
        ) : (
          <div>
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-neutral-400 text-white uppercase tracking-wide">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                </tr>
              </thead>

              <tbody>
                {pastOrders?.map(({ name, price, quantity, orderId }) => (
                  <tr
                    key={orderId}
                    className="bg-white hover:bg-gray-500 border-b-2 border-neutral-200 last:border-none"
                  >
                    <td className="px-4 py-3">{name}</td>
                    <td className="px-4 py-3">Ksh. {price}</td>
                    <td className="px-4 py-3">{quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
