import { useState } from "react";
import { FiSend } from "react-icons/fi";
import PropTypes from "prop-types";

const Chatbot = ({ isVisible, toggleVisibility }) => {
  const [messages, setMessages] = useState([]); // State for storing messages
  const [input, setInput] = useState(""); // State for input field

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
      setInput(""); // Clear input field
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return isVisible ? (
    <div className="fixed bottom-16 right-4 w-80 h-96 bg-gray-200 dark:bg-night-200 shadow-xl rounded-lg flex flex-col p-4 z-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200">
          Chat with Us
        </h3>
        <button
          onClick={toggleVisibility}
          className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
        >
          ✖
        </button>
      </div>
      {/* Messages Section */}
      <div className="flex-grow overflow-y-auto bg-gray-100 dark:bg-night-100 rounded p-2 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${message.isUser
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
          className="flex-grow px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-night-100 text-gray-900 dark:text-gray-200"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 rounded-full bg-orange-400 text-white hover:bg-orange-500 focus:outline-none"
        >
          <FiSend size={20} />
        </button>
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

