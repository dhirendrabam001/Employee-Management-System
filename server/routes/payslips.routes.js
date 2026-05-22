const express = require("express");
const { payslips } = require("../controllers/payslips.controller");

const router = express.Router();

router.post("/payslips", payslips);

module.exports = router;
