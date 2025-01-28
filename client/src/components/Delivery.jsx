import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import Button from "./common/Button";
import { useToken } from "./AuthProvider";
import axios from "axios";

const fakeData = [
  {
    hostel: "Amboseli",
    room: "25",
    id: 1,
    productName: "Rice beans",
    phone: "0100678543",
    name: "Dennis",
    order_no: 123,
  },
  {
    hostel: "L.Nakuru",
    room: "27",
    id: 2,
    productName: "2 Chapati",
    phone: "0723678543",
    name: "Mitchelle",
    order_no: 321,
  },
];

function Delivery() {
  const [deliveries, setDeliveries] = useState(fakeData);
  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  console.log(count);

  // GET THE DELIVERIES FOR THE DELIVERY GUY
  useEffect(() => {
    async function getDeliveries() {
      setLoading(true);
      try {
        /* REPLACE WITH REAL API ENDPOINT */
        const res = await new Promise((resolve) => {
          setTimeout(resolve("Geting delivery data", 1200));
        });

        console.log(res);
      } catch (error) {
        console.error("Error getting delivery data:", error);
      } finally {
        setLoading(false);
      }
    }

    getDeliveries();
  }, []);

  const hanldeClick = async (order_no) => {
    if (count === 0) {
      try {
        /* PATCH DELIVERY STATUS TO ON TRANSIT */
        const res = await axios.patch(
          `http://127.0.0.1:8000/restaurant/api/orders/${order_no}/update-delivery-status/`,
          {
            delivery_status: "on_transit",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true,
          }
        );
        setCount(1);
        console.log(res);
      } catch (error) {
        console.error("Error setting on transit delivery status: ", error);
      }
    } else if (count === 1) {
      try {
        /* PATCH DELIVERY STATUS TO ON DELIVERED*/
        const res = await axios.patch(
          `http://127.0.0.1:8000/restaurant/api/orders/${order_no}/update-delivery-status/`,
          {
            delivery_status: "complete",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setCount(2);
        console.log(res);
      } catch (error) {
        console.error("Error setting delivered delivery status: ", error);
      }
    }
  };

  const buttonText =
    count === 0
      ? "Mark on transit"
      : count === 1
      ? "Mark As Delivered"
      : "Delivered";

  return (
    <section className="min-h-screen flex-grow bg-zinc-200 dark:bg-night-200 pt-24 pb-6 ">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6 underline underline-offset-8">
        My Deliveries
      </h2>

      <div className="px-4">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center text-night-200">
            <p className="font-bold text-2xl sm:text-3xl mb-2 dark:text-gray-500">
              Loading Deliveries...
            </p>
            <FadeLoader size={50} color="#f57710" />
          </div>
        ) : (
          <div className="grid gap-1 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
            {deliveries.map((item) => (
              <article
                key={item.id}
                className="p-2 bg-white mb-3 rounded-md pl-4 pb-3 font-openSans tracking-wide shadow-md"
              >
                <p className="text-xl capitalize text-night-100 font-bold mb-2">
                  {item.productName}
                </p>
                <p className="text-night-100">Name: {item.name}</p>
                <p className="my-1 text-night-100">Phone: {item.phone}</p>
                <p className="text-night-100">
                  Hostel: {item.hostel} {item.room}
                </p>

                <Button
                  type="button"
                  onClick={() => hanldeClick(item.order_no)}
                  disabled={count === 2}
                  moreStyles={`px-3 text-sm mt-4 disabled:cursor-not-allowed  ${
                    count === 0
                      ? "bg-orange-600"
                      : count === 1
                      ? "bg-sky-500"
                      : "bg-green-600"
                  }`}
                >
                  {buttonText}
                </Button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Delivery;
