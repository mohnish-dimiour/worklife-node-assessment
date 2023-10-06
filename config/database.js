const mongoose = require("mongoose");
const dotenvConfig = require('./env');
dotenvConfig(); // Call the function to load environment variables // Load environment variables from .env

const connectDB = async () => {
  try {
    const atlasURI = process.env.MONGODB_URI; // Use the environment variable
    await mongoose.connect(atlasURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
