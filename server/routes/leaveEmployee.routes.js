const express = require("express");

const { applyLeave, getMyLeave, getSingleEmployeeLeave,  } = require("../controllers/leaveEmployee.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/applyLeave", auth, applyLeave);
router.get("/getMyLeave", auth, getMyLeave);
router.get("/getSingleLeave/:id", auth, getSingleEmployeeLeave);

module.exports = router;
