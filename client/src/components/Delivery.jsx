import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import Button from "./common/Button";
//import axios from "axios";

const fakeData = [
  {
    hostel: "Amboseli",
    room: "25",
    id: 1,
    productName: "Rice beans",
    phone: "0100678543",
    name: "Dennis",
  },
  {
    hostel: "L.Nakuru",
    room: "27",
    id: 2,
    productName: "2 Chapati",
    phone: "0723678543",
    name: "Mitchelle",
  },
  {
    hostel: "Tsavo",
    room: "31",
    id: 3,
    productName: "Ugali sukuma",
    phone: "010059563",
    name: "Stephen",
  },
];

function Delivery() {
  //const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const hanldeClick = async () => {
    try {
      /* REPLACE WITH REAL API CALL */
      const res = await new Promise((resolve) =>
        setTimeout(resolve("delivered"), 1000)
      );
      console.log(res);     
    } catch (error) {
      console.error("Error setting delivery status: ", error);
    }
  };

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
            {fakeData.map((item) => (
              <article
                key={item.id}
                className="p-2 bg-white mb-3 rounded-md pl-4 pb-3 font-openSans tracking-wide shadow-md"
              >
                <p className="text-xl capitalize text-night-100 font-bold mb-2">
                  {item.productName}
                </p>
                <p className="text-night-100">Name: {item.name}</p>
                <p className="my-1 text-night-100">Phone: {item.phone}</p>
                <p className="text-teal-700">
                  Hostel: {item.hostel} {item.room}
                </p>

                <Button
                  type="button"
                  onClick={hanldeClick}
                  moreStyles="w-36 bg-orange-200 text-sm py-1 mt-2"
                >
                  mark as delivered
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
