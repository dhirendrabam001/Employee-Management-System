const { Employee } = require("../models/employees.model");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");

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
    // hashPassword
    let user = await User.findOne({ email });

    if (!user) {
      const hashPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        fullName: `${firstName} ${lastName}`,
        phoneNumber: phone,
        email,
        password: hashPassword,
        role: "employee",
      });
    }
    const emailExists = await Employee.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists with this email",
      });
    }
    const employee = await Employee.create({
      user: user._id, // ✅ THIS LINE IS MOST IMPORTANT
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

// GET ALL EMPLOYEE DETAILS
const getAllEmployeeList = async (req, res) => {
  try {
    // all employee data
    const employee = await Employee.find().select("-password");

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee is not fetched" });
    }

    return res.status(200).json({
      success: true,
      employee,
      message: "Employee data fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee does not found!" });
    }

    return res.status(200).json({
      success: true,
      employee,
      message: "Employee data fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// update profile
const updateEmployeeProfile = async (req, res) => {
  try {
    const employeeId = req.params.id;
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
      status,
      email,
      password,
      role,
    } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee does not found" });
    }

    // Update fields (only if provided)
    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (phone) employee.phone = phone;
    if (date) employee.date = date;
    if (bio) employee.bio = bio;
    if (department) employee.department = department;
    if (position) employee.position = position;
    if (salary) employee.salary = salary;
    if (allowance) employee.allowance = allowance;
    if (deduction) employee.deduction = deduction;
    if (status) employee.status = status;
    if (email) employee.email = email;
    if (role) employee.role = role;

    // change passowrd safely
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      employee.password = hashPassword;
    }

    await employee.save();

    return res.status(200).json({
      success: true,
      employee: {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        phone: employee.phone,
        date: employee.date,
        bio: employee.bio,
        department: employee.department,
        position: employee.position,
        salary: employee.salary,
        allowance: employee.allowance,
        deduction: employee.deduction,
        status: employee.status,
        email: employee.email,
        role: employee.role,
      },
      message: "Employee Profile Updated Successfully!",
    });
    // update employee data
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    console.log("DELETE API HIT");
    const employeeId = req.params.id;
    console.log("first", employeeId);

    // find employee
    const employee = await Employee.findById(employeeId);
    console.log("second", employee);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee id does not found!" });
    }

    // delete employee
    await Employee.findByIdAndDelete(employeeId);
    return res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  employee,
  getAllEmployeeList,
  getEmployeeById,
  updateEmployeeProfile,
  deleteEmployeeById,
};
