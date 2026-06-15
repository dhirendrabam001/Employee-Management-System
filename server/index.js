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
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// all routes
const userRoutes = require("./routes/user.routes");
const employeeRoutes = require("./routes/employee.routes");
const payslipsRoutes = require("./routes/payslips.routes");
const attendanceRoutes = require("./routes/attendance.routes");

// apis
app.use("/api/user", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/payslips", payslipsRoutes);
app.use("/api/attendance", attendanceRoutes);
const port = process.env.PORT || 9000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running port number: ${port}`);
});
