/* eslint-disable react/prop-types */
// src/components/OrderStatus.jsx
import {
  FaClipboardCheck,
  FaShoppingBag,
  FaWalking,
  FaHome,
  FaCheckCircle,
} from "react-icons/fa";

// Component to display stages of the order
const OrderStatus = ({ stage }) => {
  const stages = [
    { title: "Ordered", icon: <FaClipboardCheck /> },
    { title: "Packed", icon: <FaShoppingBag /> },
    { title: "Picked", icon: <FaWalking /> },
    { title: "Delivered", icon: <FaHome /> },
    { title: "Completed", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="order-status flex justify-around my-4 bg-gray-100 p-4 rounded-md shadow-md">
      {stages.map((s, index) => (
        <div
          key={index}
          className={`text-center ${
            index <= stage ? "text-green-500" : "text-orange-500"
          }`}
        >
          <div className="text-2xl mb-1">{s.icon}</div>
          <div className="text-xs text-black">{s.title}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;
