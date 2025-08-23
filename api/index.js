import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import messageRoutes from './routes/messages.js';

// Environment variables
const MONGODB_URI = 'mongodb+srv://burakbote11:09Buraq32@cluster0.1i4e1cy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const JWT_SECRET = 'fitbro_secret_key_2024';
const PORT = 3000;

// Debug: Check if env variables are loaded
console.log('Environment variables:');
console.log('MONGODB_URI:', MONGODB_URI);
console.log('JWT_SECRET:', JWT_SECRET);
console.log('PORT:', PORT);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FitBro API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Vercel serverless function export
export default app;
