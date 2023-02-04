const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });

  console.log(`MongoDB connected ${conn.connection.host}`.cyan.underline.bold);
};

mongoose.set("strictQuery", true);

module.exports = connectDB;
