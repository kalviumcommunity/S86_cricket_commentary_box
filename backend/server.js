const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.log("❌ MongoDB connection failed:", err));

// Routes
const commentaryRoutes = require('./routes/commentaryRoutes');
app.use('/api/commentary', commentaryRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
