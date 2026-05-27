import mongoose from 'mongoose';

const uri = "mongodb+srv://vnwimo13_learnable:79565.VicChi@learnabletest1.zjawcyr.mongodb.net/?appName=LearnableTest1";


async function connectDB(): Promise<void> {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
}

export default connectDB;
    
  
