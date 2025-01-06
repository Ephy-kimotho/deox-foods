import { useState } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";

const Chatbot = ({ isVisible, toggleVisibility }) => {
  const [messages, setMessages] = useState([]); // State for storing messages
  const [input, setInput] = useState(""); // State for input field

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, isUser: true },
      ]);
      setInput(""); // Clear input field
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return isVisible ? (
    <div className="fixed bottom-20 right-10 w-80 h-96 bg-neutral-100 dark:bg-night-200 shadow-xl rounded-lg flex flex-col p-4 z-30 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200">
          Chat with Us
        </h3>
        <button
          onClick={toggleVisibility}
          className="text-gray-800 hover:text-red-100 dark:text-gray-100"
        >
          <IoClose className="text-2xl" />
        </button>
      </div>
      {/* Messages Section */}
      <div className="flex-grow overflow-y-auto bg-gray-100 dark:bg-night-100 rounded p-2 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.isUser
                ? "self-end bg-orange-400 text-white"
                : "self-start bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
            } px-4 py-2 rounded-lg max-w-xs`}
          >
            {message.text}
          </div>
        ))}
      </div>
      {/* Input Section */}
      <div className="mt-2 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Type your message..."
          className="flex-grow px-3 py-2 rounded border-2 border-gray-800 dark:border-gray-600 bg-gray-200 dark:bg-night-100 text-gray-900 dark:text-gray-200 placeholder:text-gray-600"
        />
      </div>
    </div>
  ) : null;
};

// Add PropTypes for validation
Chatbot.propTypes = {
  isVisible: PropTypes.bool,
  toggleVisibility: PropTypes.func, // Optional function
};

export default Chatbot;
