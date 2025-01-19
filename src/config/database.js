const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
module.exports = connect;
