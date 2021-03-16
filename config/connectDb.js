const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    let reslt = await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error(`Cannot connect to DataBase... ${error}`);
  }
};

module.exports = connectDB;
