import { useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import OrderStatus from "./OrderStatus";
import { useToken } from "./AuthProvider";
import { getMyOrders } from "../utils/utils";

const MyOrders = () => {
  const [pastOrders, setPastOrders] = useState([]); // Get past orders
  const [isLoading, setIsLoading] = useState(false); // Track errors
  const { token } = useToken();

  /* GET PAST ORDERS  */
  useEffect(() => {
    const fetchPastOrders = async () => {
      setIsLoading(true);
      try {
        const result = await getMyOrders(token);
        setPastOrders(result.orders);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPastOrders();
  }, [token]);

  let orderId = "";
  let deliveryStatus = "";

  if (pastOrders.length > 0) {
    deliveryStatus = pastOrders[0].delivery_status;
    orderId = pastOrders[0].order_no;
  }

  const orders = pastOrders?.map((item) => item.products).flat();
  const pastOrdersExist = orders.length !== 0;

  if (isLoading) {
    return (
      <div className="p-24 min-h-screen flex-grow bg-zinc-200 dark:bg-night-200 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-4 w-[330px] sm:w-[512px] bg-white py-6  rounded-md shadow-md">
          <p className="uppercase font-bold text-blue-600 tracking-wider text-base sm:text-3xl">
            Loading past orders...
          </p>
          <MoonLoader size={65} color="#111" />
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders pt-28 px-4 min-h-screen flex-grow bg-zinc-200 dark:bg-night-200">
      {/* LATEST ORDER SECTION */}

      {orderId && (
        <div
          className={`${
            deliveryStatus === "completed" ? "hidden" : "block"
          } mb-8 px-6 py-3 bg-white rounded-lg`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
            My Latest Order
          </h2>
          <OrderStatus stage={deliveryStatus} />
        </div>
      )}

      {/* PAST ORDERS SECTION */}
      <div className="bg-white p-4 rounded-md mt-2 mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
          My Past Orders
        </h2>
        {!pastOrdersExist ? (
          <p className="text-gray-600">No past orders.</p>
        ) : (
          <div>
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
              <thead>
                <tr className="bg-neutral-400 text-white uppercase tracking-wide">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-6 py-2 ">Price</th>
                  <th className="px-4 py-2 text-center">Quantity</th>
                </tr>
              </thead>

              <tbody>
                {orders.map(({ product_name, total_price, quantity }, key) => (
                  <tr
                    key={key}
                    className="bg-white hover:bg-slate-700 border-b-2 border-neutral-200 last:border-none hover:text-white"
                  >
                    <td className="pl-4 sm:px-4 py-3">{product_name}</td>
                    <td className="px-2 text-center sm:text-left py-3 w-12">
                      Ksh. {total_price}
                    </td>
                    <td className="sm:px-4 py-3 text-center">{quantity}</td>
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
