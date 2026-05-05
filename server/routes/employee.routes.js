const express = require("express");
const { employee } = require("../controllers/employee.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/addEmployee", auth, employee);

module.exports = router;
