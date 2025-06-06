const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongoose connected successfully!");
  } catch (error) {
    console.error("Mongoose connection error:", error);
    process.exit(1);
  }
};

module.exports = { mongoose, connectMongoose };
