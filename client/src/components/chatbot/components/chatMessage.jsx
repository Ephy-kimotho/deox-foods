/* eslint-disable react/prop-types */
// src/components/ChatMessage.jsx
import { Box, Typography } from "@mui/material";

const ChatMessage = ({ message, isAI = true }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isAI ? "flex-start" : "flex-end",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          maxWidth: "70%",
          backgroundColor: isAI ? "#e8f5e9" : "#ffe0b2",
          color: isAI ? "#388e3c" : "#ef6c00",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            fontWeight: isAI ? "600" : "500",
            wordWrap: "break-word",
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
