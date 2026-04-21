const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const { fullName, email, password, phoneNumber, adminKey } = req.body;
  //   check first all field are required
  if (!fullName || !email || !password || !phoneNumber) {
    return res
      .status(404)
      .json({ success: false, message: "Please All Field Are Required!" });
  }
  //   check email user and database store email
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res
      .status(404)
      .json({ success: false, message: "Email Already Exits" });
  }

  //   hash password
  const hashPassword = await bcrypt.hash(password, 10);

  //   check role
  let role = "employee";

  //   create from database
  await User.create({
    fullName,
    email,
    password: hashPassword,
    phoneNumber,
  });

  res.status(201).json({
    success: true,
    message: "User Register Successfully",
  });
};

module.exports = { register };
