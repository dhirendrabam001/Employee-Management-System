const { Payslips } = require("../models/payslips.model");
const { Employee } = require("../models/employees.model");

const payslips = async (req, res) => {
  try {
    const {
      employee,
      month,
      year,
      basicSalary,
      allowances = 0,
      deductions = 0,
      netSalary,
      status,
    } = req.body;

    // check first all field are requied or not
    if (!employee || !month || !year || !allowances || !deductions) {
      return res
        .status(400)
        .json({ success: false, message: "Please all field are requried" });
    }

    // find employee
    const employeeData = await Employee.findById(employee);
    console.log("Employee", employeeData);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

module.exports = { payslips };
