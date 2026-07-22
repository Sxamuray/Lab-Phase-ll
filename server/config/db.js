const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

async function connectDB() {
  if (process.env.USE_MEMORY_DB === 'true') {
    const memoryServer = await MongoMemoryServer.create();
    const uri = memoryServer.getUri();
    await mongoose.connect(uri);
    console.log('MongoDB connected (in-memory dev database)');
    return memoryServer;
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log('MongoDB connected');
  return null;
}

module.exports = { connectDB };
