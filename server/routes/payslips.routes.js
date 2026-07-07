const express = require("express");
const auth = require("../middleware/auth");
const {
  payslips,
  getAllPayslips,
  getPayslipById,
  updateStatus,
  getMyPayslip,
} = require("../controllers/payslips.controller");

const router = express.Router();

router.post("/payslips", auth, payslips);
router.get("/getAllPayslipsList", auth, getAllPayslips);
router.get("/getPayslipById/:id", auth, getPayslipById);
router.get("/getMyPayslip/:id", auth, getMyPayslip);
router.put("/updateStatus/:id/status", updateStatus);

module.exports = router;
