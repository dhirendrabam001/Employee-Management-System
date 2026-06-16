const express = require("express");
const {
  clockIn,
  getAllAttendace,
} = require("../controllers/attendance.controller");
const auth = require("../middleware/auth");
const router = express.Router();
router.post("/attendanceData", auth, clockIn);
router.get("/getAllAttendance", auth, getAllAttendace);

module.exports = router;
