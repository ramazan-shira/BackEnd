const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://zanishira1:zanishira1@cluster0.bdzdn4i.mongodb.net/task-management"
    );
  } catch (error) {
    console.error("MongoDB connection failed!", error);
    process.exit(1);
  }
};

module.exports = connectDB;
