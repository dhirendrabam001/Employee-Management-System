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
    const { email, role } = req.body;

    // check email field or not
    if (!email || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Please All Field Are Required" });
    }

    // find email in database
    const user = await User.findOne({ email, role });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: `${role} is not found this email` });
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
  const { email, password, role } = req.body;

  // ✅ validation
  if (!email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Password are required",
    });
  }

  // ✅ find user
  const user = await User.findOne({ email, role });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: `${role} is not found,`,
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
    { expiresIn: "1h" },
  );

  // console.log(token);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/", // VERY IMPORTANT
    maxAge: 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    user,
    role: user.role,
    message: "Login Success",
  });
};

// Update Profile and Password

const updateSetting = async (req, res) => {
  try {
    const { fullName, email, bio } = req.body;

    const userId = req.user.id;

    // check email already exit or mot

    const user = await User.findById(userId);

    const checkEmail = await User.findOne({
      email,
      _id: { $ne: userId },
    });

    if (checkEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exits" });
    }

    // create object
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (bio !== undefined) updateData.bio = bio;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      updateData,

      { new: true },
    );

    return res.status(200).json({
      success: true,
      user: updateUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ suceess: false, message: "Internal server error!" });
  }
};

// change password controller
const changePassword = async (req, res) => {
  try {
    const { currentPass, newPass } = req.body;
    const userId = req.user.id;

    // check both password required
    if (!currentPass || !newPass) {
      return res.status(400).json({
        success: false,
        message: "Current pass and new password are requried!",
      });
    }

    // find user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User is not found!" });
    }

    // check current password and new password
    const isMatch = await bcrypt.compare(currentPass, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is not matched" });
    }

    // check new same password
    const isSamePass = await bcrypt.compare(newPass, user.password);
    if (isSamePass) {
      return res.status(400).json({
        success: false,
        message: "New password and old password same",
      });
    }
    //  hash new password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newPass, salt);

    // update password
    await User.findByIdAndUpdate(userId, { password: hashPass });

    return res
      .status(200)
      .json({ success: true, message: "Password change successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// refresh token
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Issue" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Issue" });
  }
};

module.exports = {
  register,
  checkEmail,
  login,
  updateSetting,
  changePassword,
  getMe,
  logout,
};
