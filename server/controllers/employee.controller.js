const { Employee } = require("../models/employees.model");
const bcrypt = require("bcrypt");

const employee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      date,
      bio,
      department,
      position,
      salary,
      allowance,
      deduction,
      email,
      password,
      role,
    } = req.body;

    // check all field are requried
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !date ||
      !bio ||
      !department ||
      !position ||
      !salary ||
      !allowance ||
      !deduction ||
      !email ||
      !password ||
      !role
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please all field are required" });
    }

    // check if user already exits or not
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employees already exists within email!",
      });
    }

    // hashPassword
    const hashPassword = await bcrypt.hash(password, 10);
    const employee = await Employee.create({
      firstName,
      lastName,
      phone,
      date,
      bio,
      department,
      position,
      salary,
      allowance,
      deduction,
      email,
      password: hashPassword,
      role,
    });

    // create employee
    return res.status(201).json({
      success: true,
      employee,
      message: "Employee Create Successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getAllEmployee = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

module.exports = { employee, getAllEmployee };
