const { Attendance } = require("../models/employee.attendance.model");
const attendance = async (req, res) => {
  try {
    const {
      employee,
      attendanceDate,
      clockInTime,
      workLocation,
      shiftTime,
      notes,
      status,
      totalWorkingHrs,
    } = req.body;
    console.log(req.body);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

module.exports = {
  attendance,
};
