/* eslint-disable react/prop-types */
// src/components/ChatInput.jsx
import React from "react";
import { TextField, Box } from "@mui/material";

const ChatInput = ({ placeholder = "Type a message...", onSend }) => {
  const [message, setMessage] = React.useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: "20px 15px", // Increased top padding
        backgroundColor: "#fb8c00", // Green background
        borderTop: "3px solid #fb8c00", // Orange border at the top
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
          borderRadius: "10px",
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#fb8c00", // Orange border for the input
            },
            "&:hover fieldset": {
              borderColor: "#34a853", // Green border on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#34a853", // Green border when focused
            },
          },
        }}
      />
    </Box>
  );
};

export default ChatInput;
