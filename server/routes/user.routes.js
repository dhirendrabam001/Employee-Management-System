const express = require("express");
const {
  register,
  login,
  checkEmail,
  getMe,
  logout,
} = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/checkEmail", checkEmail);
router.post("/login", login);
router.get("/me", auth, getMe);
router.get("/logout", logout);

module.exports = router;
