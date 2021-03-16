// import express
const express = require("express");
// express instance
const app = express();

// Environment variables
require("dotenv").config();

const port = process.env.PORT;

// Connect to DB
const connectDB = require("./config/connectDb");
connectDB();
// Create Route
// Middleware body parser
app.use(express.json());
app.use("/api/users", require("./routes/Users"));
// Start Server

app.listen(port, (err) => {
  err ? console.error(err) : console.log(`Server is Running on Port ${port}`);
});
