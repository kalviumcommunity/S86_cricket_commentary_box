const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from config/.env
dotenv.config({ path: "./config/.env" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = require("./db/database");
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const matchRoutes = require('./routes/matchRoutes');
app.use('/api/matches', matchRoutes);


const profileRoutes = require('./routes/profileRoutes');
app.use('/api/profile', profileRoutes);


// Health check endpoint (optional)
app.get("/", (req, res) => {
  res.send("API is running");
});

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
