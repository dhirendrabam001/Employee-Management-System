const express = require("express");
const auth = require("../middleware/auth");
const {
  payslips,
  getAllPayslips,
} = require("../controllers/payslips.controller");

const router = express.Router();

router.post("/payslips", auth, payslips);
router.get("/getAllPayslipsList", getAllPayslips);

module.exports = router;
