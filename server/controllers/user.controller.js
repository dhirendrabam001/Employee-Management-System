const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { fullName, email, password, phoneNumber, role } = req.body;
  //   check first all field are required
  if (!fullName || !email || !password || !phoneNumber || !role) {
    return res
      .status(400)
      .json({ success: false, message: "Please All Field Are Required!" });
  }
  //   check email user and database store email
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res
      .status(400)
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

// checkEmail
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // check email field or not
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please All Field Are Required" });
    }

    // find email in database
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "Email verified" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  // ✅ validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Password are required",
    });
  }

  // ✅ find user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  // compare password and hashpassword
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res
      .status(400)
      .json({ success: false, message: "Password does not matched" });
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
    sameSite: "None",
    path: "/", // VERY IMPORTANT
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    user,
    role: user.role,
    message: "Login Success",
  });
};

module.exports = { register, checkEmail, login };
