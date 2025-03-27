const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // Middleware to parse JSON

// ✅ Connect to MongoDB
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => console.log("❌ MongoDB connection failed:", err));

//  Home Route
app.get('/home', (req, res) => {
    res.send("Hello, this is Mukesh!");
});

//  Import and Use Routes
const matchRoutes = require('./routes');
app.use('/api', matchRoutes);

//  Start Server
app.listen(PORT, () => {
    console.log(` Server is running at http://localhost:${PORT}`);
});
