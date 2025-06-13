import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ======= MIDDLEWARE =======

// Security headers
app.use(helmet());

// Enable gzip compression
app.use(compression());

// Enable CORS for all origins (customize if needed)
app.use(cors());

// Logging requests
app.use(morgan('dev'));

// Body parser
app.use(express.json());

// Rate limiting (100 requests per 15 mins per IP)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use('/api', limiter);

// ======= DATABASE =======

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ======= ROUTES =======

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.get('/api/items', (req, res) => {
  res.json([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
});

// Health check (optional)
// app.get('/health', (req, res) => {
//   res.status(200).send('Backend is healthy!');
// });

// ======= GLOBAL ERROR HANDLER =======
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ======= START SERVER =======
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
