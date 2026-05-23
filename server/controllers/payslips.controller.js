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
    if (!employee || !month || !year) {
      return res
        .status(400)
        .json({ success: false, message: "Please all field are requried" });
    }

    // find employee
    const employeeData = await Employee.findById(employee);
    if (!employeeData) {
      return res
        .status(404)
        .json({ success: false, message: "Employee does not found!" });
    }

    // check existing payslips
    const existingPayslip = await Payslips.findOne({ employee, year, month });
    if (existingPayslip) {
      return res.status(400).json({
        success: false,
        message: "Payslips already generated this employee",
      });
    }

    // salary calculation
    const employeeSalary = employeeData.salary;

    const totalAllowances = Number(allowances);
    const totalDeductions = Number(deductions);
    const netEmployeeSalary =
      employeeSalary + totalAllowances - totalDeductions;

    // create new patslip
    const newPayslips = await Payslips.create({
      employee,
      month,
      year,
      basicSalary: employeeSalary,
      allowances: totalAllowances,
      deductions: totalDeductions,
      netSalary: netEmployeeSalary,
      status,
    });

    // populate employeedata

    const populatePayslips = await Payslips.findById(newPayslips._id).populate(
      "employee",
      "firstName lastName email position department",
    );

    return res.status(201).json({
      success: true,
      payslips: populatePayslips,
      message: "Payslips generated successfully!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

module.exports = { payslips };
