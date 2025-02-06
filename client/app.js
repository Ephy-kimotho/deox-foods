// Import express
const express = require('express');

// Create an Express app
const app = express();

// Serve static files from the 'dist' directory
app.use(express.static('dist'));

// Route all traffic to index.html
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

// Define the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
