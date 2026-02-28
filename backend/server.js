require('dotenv').config();
const app = require('./src/app');
const connectDatabase = require('./src/config/db');

const PORT = process.env.PORT || 5000;

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

// Start server locally (Vercel will ignore this if configured to export the app)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  startServer();
}

module.exports = app;
