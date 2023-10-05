// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace 'YOUR_MONGODB_ATLAS_URI' with your actual MongoDB Atlas URI
    // MONGODB_URI=mongodb+srv://mohnishk3797:Qwerty@#$12345@cluster.mongodb.net/test_node
    const atlasURI = 'mongodb://localhost:27017/work_life_app_db';
    // const atlasURI = "mongodb+srv://mohnishk3797:Qwerty12345@cluster0.lxhktak.mongodb.net/test_node?retryWrites=true&w=majority";

    await mongoose.connect(atlasURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
