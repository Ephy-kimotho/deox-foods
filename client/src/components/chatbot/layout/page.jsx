// src/components/ChatbotLayout.jsx
import  { useState } from "react";
import { Box } from "@mui/material";
import ChatGPTInfo from "../chat/page";
import ChatInput from "../components/chatInput";
import ChatMessage from "../components/chatMessage";
import Navbar from "../components/chatNavbar";  // Import Navbar component

const ChatbotLayout = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (newMessage) => {
    // Add user message to messages
    setMessages((prev) => [...prev, { text: newMessage, isAI: false }]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `
      Invictus
      By William Ernest Henley

      Out of the night that covers me,
      Black as the pit from pole to pole,
      I thank whatever gods may be
      For my unconquerable soul.

      In the fell clutch of circumstance
      I have not winced nor cried aloud.
      Under the bludgeonings of chance
      My head is bloody, but unbowed.

      Beyond this place of wrath and tears
      Looms but the Horror of the shade,
      And yet the menace of the years
      Finds and shall find me unafraid.

      It matters not how strait the gate,
      How charged with punishments the scroll,
      I am the master of my fate,
      I am the captain of my soul.
      `;
      setMessages((prev) => [...prev, { text: aiResponse.trim(), isAI: true }]);
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#fb8c00", // Orange background for the layout
      }}
    >
      {/* Navbar at the top */}
      <Navbar />

      {/* Conditionally render ChatGPT Info */}
      {messages.length === 0 && (
        <Box
          sx={{
            backgroundColor: "#34a853", // Green for info section
            padding: "20px",
            color: "white",
            textAlign: "center",
          }}
        >
          <ChatGPTInfo />
        </Box>
      )}

      {/* Chat Messages Section */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          backgroundColor: "#fb8c00", // White background for chat messages
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isAI={msg.isAI} />
        ))}
      </Box>

      {/* Chat Input Section */}
      <Box
        sx={{
          backgroundColor: "#fb8c00", // Green for input section
          borderTop: "3px solid #fb8c00", // Orange border
          padding: "10px",
        }}
      >
        <ChatInput onSend={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default ChatbotLayout;
