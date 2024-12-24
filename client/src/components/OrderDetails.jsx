/* eslint-disable react/prop-types */
import React from "react";
import {
  FaClipboardCheck,
  FaShoppingBag,
  FaWalking,
  FaHome,
  FaCheckCircle,
} from "react-icons/fa";

// Component to display details for each stage
const OrderDetails = ({ stage, dateTime }) => {
  const descriptions = [
    "Your order has been received by Deox-Foods. Please wait as we deliver it.",
    "Your order has now been packed and is awaiting delivery.",
    "Your order is now being delivered by Deox-Foods. Please be patient while we deliver it to your doorstep.",
    "Your order has been delivered. Enjoy your meal - Deox-Foods.",
    "Order completed - Thank you for ordering with Deox-Foods.",
  ];

  const icons = [
    FaClipboardCheck,
    FaShoppingBag,
    FaWalking,
    FaHome,
    FaCheckCircle,
  ];

  return (
    <div className="order-details my-4">
      {stage >= 0 && (
        <div className="stage-description flex items-center bg-white p-4 rounded-md shadow-sm">
          <div className="text-green-500 text-2xl mr-2">
            {React.createElement(icons[stage])}
          </div>
          <div className="flex flex-col">
            <span>{descriptions[stage]}</span>
            <span className="text-gray-500 text-xs">{dateTime}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
