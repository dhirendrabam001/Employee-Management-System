const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// require everyting
require("dotenv").config();
const connectDB = require("./config/connection");

const app = express();

// cors used
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// all routes
const userRoutes = require("./routes/user.routes");

// apis
app.use("/api/user", userRoutes);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running port number: ${port}`);
});
