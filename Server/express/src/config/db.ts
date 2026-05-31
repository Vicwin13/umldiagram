import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const connString = process.env.MONGODB_URI;

    if (!connString) { 
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    await mongoose.connect(connString);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
}

export default connectDB;
    
  
