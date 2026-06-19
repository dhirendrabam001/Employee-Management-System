const express = require("express");

const { applyLeave } = require("../controllers/leaveEmployee.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/applyLeave", auth, applyLeave);

module.exports = router;
