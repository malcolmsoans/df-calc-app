import express from 'express';
import dotenv from 'dotenv';
import verifyRecaptcha from './routes/verify-recaptcha';

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Register the verify-recaptcha route
app.use('/api', verifyRecaptcha);

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));