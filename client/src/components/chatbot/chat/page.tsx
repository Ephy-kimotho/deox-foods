// src/pages/ChatGPTInfo.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#34a853", // Green
    },
    secondary: {
      main: "#fb8c00", // Orange
    },
    background: {
      default: "#1a1a1a", // Dark background
    },
    text: {
      primary: "#ffffff", // White text
    },
  },
});

const ChatGPTInfo = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "80vh",
          backgroundColor: "secondary.main",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
        }}
      >

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                padding: 3,
                backgroundColor: "primary.main",
                color: "text.primary",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Examples
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography>"Explain something to me"</Typography>
              <Typography>
                "What is the difference between a dog and a cat?"
              </Typography>
              <Typography>"What is the color of the sun?"</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                padding: 3,
                backgroundColor: "secondary.main",
                color: "text.primary",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Capabilities
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography>Change the ChatGPT Model to use</Typography>
              <Typography>
                Messages are stored in Firebase's Firestore
              </Typography>
              <Typography>
                Hot Toast notifications when ChatGPT is thinking!
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                padding: 3,
                backgroundColor: "primary.main",
                color: "text.primary",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Limitations
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography>May occasionally generate incorrect information</Typography>
              <Typography>
                May occasionally produce harmful instructions or biased content
              </Typography>
              <Typography>
                Limited knowledge of world and events after 2021
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default ChatGPTInfo;
