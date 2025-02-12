const express = require('express');
const app = express();
const PORT = 3000;

// Basic /ping route
app.get('/ping', (req, res) => {
  res.status(200).send('Hey, This is Mukesh');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});