import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { postMessageToBot } from "../utils/utils";
import { decode } from "html-entities";
import { PulseLoader } from "react-spinners";
import PropTypes from "prop-types";

const Chatbot = ({ isVisible, toggleVisibility }) => {
  const [messages, setMessages] = useState([]); // State for storing messages
  const [input, setInput] = useState(""); // State for input field
  const [expandedReasoning, setExpandedReasoning] = useState(null); // State to track reasoning toggle
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim()) {
      // User message
      const userMessage = { text: input, isUser: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput(""); // Clear input field

      try {
        setIsLoading(true);
        const res = await postMessageToBot(input);
        const response = decode(res);
        const botResponse = {
          text: response,
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return isVisible ? (
    <div className="fixed bottom-14 right-3 sm:right-6 md:right-10 w-[330px] h-[400px] sm:w-[600px] md:w-[700px] lg:w-[850px] bg-neutral-200 dark:bg-night-200 shadow-xl rounded-lg flex flex-col p-4 z-30">
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
          <div key={index} className="flex flex-col space-y-1">
            <div
              className={`flex ${
                message.isUser
                  ? "self-end bg-orange-400 text-white text-right"
                  : "self-start bg-gray-800 dark:bg-gray-600 text-white dark:text-white w-4/5 max-w-md"
              } px-4 py-2 rounded-lg `}
            >
              <span>{message.text}</span>
            </div>
            {!message.isUser && message.reasoning && (
              <div className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                <button
                  className="text-blue-500 bg-blue-100 p-2 rounded-lg font-semibold"
                  onClick={() =>
                    setExpandedReasoning(
                      expandedReasoning === index ? null : index
                    )
                  }
                >
                  {expandedReasoning === index
                    ? "Hide Thought"
                    : "View Thought"}
                </button>
                {expandedReasoning === index && (
                  <div className="mt-1 p-2 bg-gray-200 dark:bg-gray-700 rounded">
                    {message.reasoning}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {/* Show loader only when the bot is thinking */}
        {isLoading && (
          <div className="flex self-start bg-gray-800 dark:bg-gray-600 text-white px-4 py-2 rounded-lg max-w-xs">
            <PulseLoader size={8} color="#fff" />
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="mt-2 gap-2 flex items-center w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Type your message..."
          className="py-3 pl-3 rounded border-2 border-gray-800 dark:border-gray-600 bg-gray-200 dark:bg-night-100 text-gray-900 dark:text-gray-200 placeholder:text-gray-600 text-base text-wrap w-full"
        />
        <button
          className="px-3 py-3 bg-orange-300 mr-2 rounded-md active:scale-95"
          onClick={handleSendMessage}
        >
          <BsFillSendFill className="text-gray-200 text-2xl" />
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
