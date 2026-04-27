const express = require("express");
const {
  register,
  login,
  checkEmail,
} = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/checkEmail", checkEmail);
router.post("/login", login);

module.exports = router;
