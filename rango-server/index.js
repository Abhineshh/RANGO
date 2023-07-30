// server.js
const express = require('express');
const app = express();
const port = 3000;
/*
// Middleware to parse JSON data
app.use(express.json());

// Example route to handle POST request and send a response
app.post('/api/data', (req, res) => {
  const requestData = req.body; // Data sent by the client
  console.log('Received data from client:', requestData);

  // Process the data or perform any necessary operations
  const responseData = { message: 'Data received successfully!' };

  // Send a response back to the client
  res.json(responseData);
});
*/
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
