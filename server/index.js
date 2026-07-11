const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// require everyting
require("dotenv").config();
const connectDB = require("./config/connection");


const app = express();

// cors used
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173,https://myems-app.vercel.app")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  const normalizedOrigin = origin.trim();

  return (
    allowedOrigins.includes(normalizedOrigin) ||
    /^https:\/\/.+\.vercel\.app$/.test(normalizedOrigin) ||
    /^https:\/\/.+\.netlify\.app$/.test(normalizedOrigin) ||
    /^https:\/\/.+\.github\.io$/.test(normalizedOrigin) ||
    /^https:\/\/.+\.onrender\.com$/.test(normalizedOrigin) ||
    /^http:\/\/localhost(:\d+)?$/.test(normalizedOrigin) ||
    /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(normalizedOrigin)
  );
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
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
const leaveEmployeeRoutes = require("./routes/leaveEmployee.routes");

// apis
app.use("/api/user", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/payslips", payslipsRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveEmployeeRoutes);
const port = process.env.PORT || 9000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running port number: ${port}`);
});
