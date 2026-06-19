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

    // duplicate leave
    const existingLeave = await Leave.findOne({
      user: req.user._id,
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
    const leave = await Leave.create({
      user: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    return res
      .status(201)
      .json({ success: true, leave, message: "Leave applied successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

module.exports = {
  applyLeave,
};
