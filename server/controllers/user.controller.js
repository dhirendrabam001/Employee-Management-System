const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { fullName, email, password, phoneNumber, role } = req.body;
  //   check first all field are required
  if (!fullName || !email || !password || !phoneNumber || !role) {
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

  //   create from database
  const newUser = await User.create({
    fullName,
    email,
    password: hashPassword,
    phoneNumber,
    role,
  });

  res.status(201).json({
    success: true,
    newUser,
    message: "User Register Successfully",
  });
};

// login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  // all field are required
  if (!email || !password) {
    return res
      .status(404)
      .json({ success: false, message: "Please All Field Are Required" });
  }
  // check email exit or not database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status({ success: false, message: "User does not found" });
  }

  // compare password and hashpassword
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res
      .status(404)
      .json({ success: false, messge: "Password does not matched" });
  }

  // jwt used
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    user,
    role: user.role,
    message: "Login Success",
  });
};

module.exports = { register, login };
