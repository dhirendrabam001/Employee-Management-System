const express = require("express");
const {
  employee,
  getEmployeeAll,
} = require("../controllers/employee.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/addEmployee", auth, employee);
router.get("/getEmployeeList", auth, getEmployeeAll);

module.exports = router;
