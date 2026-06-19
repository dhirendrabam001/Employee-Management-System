const express = require("express");
const {
  clockIn,
  clockOut,
  startTimer,
  getTodayAttendance,
  getAllAttendace,
} = require("../controllers/attendance.controller");
const auth = require("../middleware/auth");
const router = express.Router();
router.post("/attendanceData", auth, clockIn);
router.post("/startTimer/:id", auth, startTimer);
router.post("/clockOut", auth, clockOut);
router.get("/getTodayAttendance", auth, getTodayAttendance);
router.get("/getAllAttendance", auth, getAllAttendace);

module.exports = router;
