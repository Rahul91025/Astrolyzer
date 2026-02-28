require('dotenv').config();
const express = require('express');
const cors = require('cors');
const zodiacRoutes = require('./routes/zodiacRoutes');
const aiRoutes = require('./routes/aiRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const connectDatabase = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDatabase();
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
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

if (!process.env.VERCEL) {
  startServer();
}

module.exports = app;
