const mongoose = require("mongoose");

// Define the database URL as an environment variable or specify it directly
const DATABASE_URI = process.env.DATABASE_URI;

// Define the MongoDB connection options
const dbOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

// Define the connectDB function to establish the MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI, dbOptions);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;
