const express = require("express");

// require everyting
require("dotenv").config();
const connectDB = require("./config/connection");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes
const userRoutes = require("./routes/user.routes");

// apis
app.use("/api/user", userRoutes);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running port number: ${port}`);
});
