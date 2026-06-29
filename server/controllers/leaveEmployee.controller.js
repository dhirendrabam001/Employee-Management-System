const { Leave } = require("../models/leaveEmployee.model");

const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    // check validation all field are required
    if (!leaveType || !startDate || !endDate || !reason) {
      return res
        .status(400)
        .json({ success: false, message: "Please all field are requreid" });
    }

    // date validation
    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End date can not be before start date",
      });
    }

    const employeeId = req.user.id;

    // duplicate leave
    const existingLeave = await Leave.findOne({
      employee: employeeId,
      startDate,
      endDate,
    });

    if (existingLeave) {
      return res.status(400).json({
        success: false,
        message: "You have already applied leave for these dates",
      });
    }

    // create leave
    let leave = await Leave.create({
      employee: employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    leave = await leave.populate("employee");

    return res.status(201).json({
      success: true,
      leave,
      message: "Leave applied successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// getmyleave
const getMyLeave = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const leave = await Leave.find({ employee: employeeId })
      .populate("employee")
      .sort({
        createdAt: -1,
      });

    console.log(leave);

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// get all employee leave[admin]
const getAllEmployeeLeaves = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admin can access" });
    }

    const leaves = await Leave.find()
      .populate("employee")
      .sort({ createdAt: -1 });
    console.log("leave", leaves);

    return res.status(200).json({
      success: true,
      leaves,
      message: "All employee leave data fetched",
    });

    console.log("leave", leave);
  } catch (error) {
    console.error(error);
  }
};

const getSingleEmployeeLeave = async (req, res) => {
  try {
    const employeeSingleId = req.params.id;
    console.log(employeeSingleId);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// check status
const updateLeaveStatus = async (req, res) => {
  try {
    // check role admin or not
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admin can accessed" });
    }
    const leaveId = req.params.id;
    console.log("leave", leaveId);

    const { status } = req.body;

    // validate status
    const allowedStatus = ["approved", "pending", "rejected"];
    if (allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }
    // find leave
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    // update
    leave.status = status;
    await leave.save();

    return res.status(200).json({
      success: true,
      message: `Leave ${status} successfully`,
      leave,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  applyLeave,
  getMyLeave,
  getAllEmployeeLeaves,
  getSingleEmployeeLeave,
  updateLeaveStatus,
};
