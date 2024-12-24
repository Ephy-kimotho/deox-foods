import { useState, useEffect } from "react";
import OrderStatus from "./OrderStatus"; // Importing OrderStatus component
import OrderDetails from "./OrderDetails"; // Importing OrderDetails component

const MyOrders = () => {
  const [currentStage, setCurrentStage] = useState(0); // Track the current stage
  const [dateTime, setDateTime] = useState(""); // Track the current date and time

  useEffect(() => {
    // Fetch the real order status and date-time from the backend (mocked for now)
    setDateTime(new Date().toLocaleString()); // Mocked datetime
  }, [currentStage]);

  return (
    <div className="my-orders p-4 min-h-screen mt-20 bg-zinc-200 dark:bg-night-200 flex-grow">
      {/* OrderStatus shows the stages */}
      <OrderStatus stage={currentStage} />

      {/* OrderDetails shows the details for each stage */}
      <OrderDetails stage={currentStage} dateTime={dateTime} />
    </div>
  );
};

export default MyOrders;
