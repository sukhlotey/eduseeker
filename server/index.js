const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allows cross-origin for local development
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
const authRoutes = require('./routers/authRoutes');
const courseRoutes = require('./routers/courseRoutes');
const applicationRoutes = require('./routers/applicationRoutes');
const userRoutes = require('./routers/userRoutes');

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);

// Root Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Eduseeker API Server is active and running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Eduseeker Backend Server running on http://localhost:${PORT}`);
});
