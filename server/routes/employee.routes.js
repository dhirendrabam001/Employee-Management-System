const express = require("express");
const {
  employee,
  getAllEmployeeList,
  getEmployeeById,
  updateEmployeeProfile,
} = require("../controllers/employee.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/addEmployee", auth, employee);
router.get("/getEmployeeList", auth, getAllEmployeeList);
router.get("/getEmployeeID/:id", auth, getEmployeeById);
router.put("/updateEmployeeProfile/:id", auth, updateEmployeeProfile);

module.exports = router;
