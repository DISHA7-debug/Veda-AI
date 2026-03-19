import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error("❌ MONGO_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ MongoDB connection failed: ${error.message}`);
    } else {
      console.error("❌ MongoDB connection failed: Unknown error");
    }
    process.exit(1);
  }
};

export default connectDB;