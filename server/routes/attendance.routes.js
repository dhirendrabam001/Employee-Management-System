const express = require("express");
const { attendance } = require("../controllers/attendance.controller");

const router = express.Router();

router.post("/attendanceData", attendance);

module.exports = router;
