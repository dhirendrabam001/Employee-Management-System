const express = require("express");
const {
  clockIn,
  clockOut,
  getTodayAttendance,
  getAllAttendace,
} = require("../controllers/attendance.controller");
const auth = require("../middleware/auth");
const router = express.Router();
router.post("/attendanceData", auth, clockIn);
router.post("/clockOut", auth, clockOut);
router.get("/getTodayAttendance", auth, getTodayAttendance);
router.get("/getAllAttendance", auth, getAllAttendace);

module.exports = router;
