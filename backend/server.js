require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');
const connectDB = require('./database');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Vehicle Paradise API is running...');
});

app.use('/api', authRoutes);
app.use('/api/profile', profileRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
