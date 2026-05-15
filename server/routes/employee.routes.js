const express = require("express");
const {
  employee,
  getAllEmployeeList,
  getEmployeeById,
} = require("../controllers/employee.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/addEmployee", auth, employee);
router.get("/getEmployeeList", auth, getAllEmployeeList);
router.get("/getEmployeeID/:id", auth, getEmployeeById);

module.exports = router;
