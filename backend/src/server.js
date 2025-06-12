import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // Important for cross-origin requests from frontend

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors()); // Allow frontend to make requests
app.use(express.json()); // Body parser for JSON requests

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic API route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Example route for a simple resource
app.get('/api/items', (req, res) => {
  res.json([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
});

// Health check endpoint (useful for Docker healthchecks)
app.get('/api/health', (req, res) => {
  res.status(200).send('Backend is healthy!');
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});