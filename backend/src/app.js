const express = require('express');
const helmet = require('helmet');
const corsMiddleware = require('./middlewares/corsConfig');
const { globalLimiter } = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const connectDatabase = require('./config/db');

// Import Routes
const zodiacRoutes = require('./routes/zodiacRoutes');
const aiRoutes = require('./routes/aiRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// Security Middleware: Set HTTP Headers
app.use(helmet());

// Rate Limiting: Prevent DDoS and API Spam
app.use(globalLimiter);

// Strict CORS: Only allow specific origins (frontend)
app.use(corsMiddleware);

// Body Parser
app.use(express.json());

// Database Connect Middleware Note: we should connect once on server start, 
// but keeping this per-request to align with previous Vercel serverless behavior if desired,
// though standard practice is to connect on app start. We'll do it on request for serverless compatibility.
let dbConnected = false;
app.use(async (req, res, next) => {
    try {
        if (!dbConnected) {
            await connectDatabase();
            dbConnected = true;
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Routes
app.use('/api/zodiac', zodiacRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/appointment', appointmentRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
