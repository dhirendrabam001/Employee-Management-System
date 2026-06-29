const express = require("express");

const {
  applyLeave,
  getMyLeave,
  getSingleEmployeeLeave,
  getAllEmployeeLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveEmployee.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/applyLeave", auth, applyLeave);
router.get("/getMyLeave", auth, getMyLeave);
router.get("/getAllEmployeeLeave", auth, getAllEmployeeLeaves);
router.get("/getSingleLeave/:id", auth, getSingleEmployeeLeave);
router.patch("/updateStatus/:id/status", auth, updateLeaveStatus);

module.exports = router;
