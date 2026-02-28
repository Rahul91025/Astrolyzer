const mongoose = require('mongoose');

let connectionPromise = null;

const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }

  const dbName = process.env.MONGODB_DB_NAME || 'data';

  connectionPromise = mongoose
    .connect(uri, { dbName })
    .then((conn) => {
      console.log(`MongoDB connected. Database: ${dbName}`);
      return conn;
    })
    .catch((error) => {
      connectionPromise = null;
      throw error;
    });

  return connectionPromise;
};

module.exports = connectDatabase;
