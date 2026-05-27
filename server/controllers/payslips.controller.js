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

    const newPayslips = await Payslips.create({
      employee,
      month,
      year,
      basicSalary: employeeSalary,
      allowances: totalAllowances,
      deductions: totalDeductions,
      netSalary: netEmployeeSalary,
      status: "Pending",
    });

    // populate employeedata

    const populatePayslips = await Payslips.findById(newPayslips._id).populate(
      "employee",
      "firstName lastName email position department",
    );

    return res.status(201).json({
      success: true,
      payslip: populatePayslips,
      message: "Payslips generated successfully!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// getAllPayslips
const getAllPayslips = async (req, res) => {
  try {
    const payslip = await Payslips.find()
      .populate("employee")
      .sort({ createdAt: -1 });

    if (payslip.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Payslips list not found",
      });
    }

    return res.status(200).json({
      success: true,
      payslip,
      message: "Payslip data fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getPayslipById = async (req, res) => {
  try {
    const payslipId = req.params.id;

    const payslip = await Payslips.findById(payslipId).populate(
      "employee",
      "firstName lastName email position department",
    );

    if (!payslip) {
      return res
        .status(404)
        .json({ success: false, message: "Payslip is not found" });
    }

    return res.status(200).json({
      success: true,
      payslip,
      message: "Payslip is found particular id",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// update status controller
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const payslipId = req.params.id;

    const payslip = await Payslips.findByIdAndUpdate(
      payslipId,
      { status },
      { new: true },
    );

    if (!payslip) {
      return res
        .status(404)
        .json({ success: false, message: "Payslip status does not found!" });
    }

    return res.status(200).json({
      success: true,
      payslip,
      message: "Payslip status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { payslips, getAllPayslips, getPayslipById, updateStatus };
