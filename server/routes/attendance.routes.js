const express = require("express");
const {
  attendance,
  getAllAttendace,
} = require("../controllers/attendance.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/attendanceData", auth, attendance);
router.get("/getAllAttendance", auth, getAllAttendace);

module.exports = router;
