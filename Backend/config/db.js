import mongoose from "mongoose";

// Setup global cache object for serverless-safe caching across invocations
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const mongoUriExists = !!process.env.MONGO_URI;
  console.log("CORS/DB DIAGNOSTICS:");
  console.log(`- MONGO_URI exists: ${mongoUriExists}`);
  console.log(`- NODE_ENV value: ${process.env.NODE_ENV}`);
  console.log(`- VERCEL value: ${process.env.VERCEL}`);

  if (global.mongoose.conn) {
    console.log("Using cached global MongoDB connection");
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    console.log("Before mongoose.connect: Initializing new connection promise...");
    const opts = {
      serverSelectionTimeoutMS: 10000 // 10 seconds limit for server selection
    };

    global.mongoose.promise = mongoose.connect(process.env.MONGO_URI, opts).then((conn) => {
      console.log(`After mongoose.connect: MongoDB connected successfully to host: ${conn.connection.host}`);
      return conn;
    }).catch((error) => {
      console.error("After mongoose.connect: FAILED to connect to MongoDB.");
      console.error("Connection Error Stack Trace:", error.stack || error);
      global.mongoose.promise = null; // reset promise on failure so next request retries
      throw error;
    });
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
  } catch (error) {
    throw error;
  }
};

export default connectDB;
