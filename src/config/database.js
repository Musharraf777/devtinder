const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://musharraf188:musharraf777@cluster0.anvhf.mongodb.net/devtinder");
};

module.exports = connectDB
