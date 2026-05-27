const express = require("express");
const auth = require("../middleware/auth");
const {
  payslips,
  getAllPayslips,
  getPayslipById,
  updateStatus,
} = require("../controllers/payslips.controller");

const router = express.Router();

router.post("/payslips", auth, payslips);
router.get("/getAllPayslipsList", auth, getAllPayslips);
router.get("/getPayslipById/:id", auth, getPayslipById);
router.put("/updateStatus/:id/status", updateStatus);

module.exports = router;
