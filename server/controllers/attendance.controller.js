const { Attendance } = require("../models/employee.attendance.model");
const { User } = require("../models/user.model");

const attendance = async (req, res) => {
  try {
    const employeeId = req.params.id;
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

    // all field are required validation
    if (
      !employee ||
      !attendanceDate ||
      !clockInTime ||
      !workLocation ||
      !shiftTime
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please all field are requried" });
    }

    // check employee exit or not
    const employeeExisting = await User.findById(employeeId);
    console.log("employee", employeeExisting);
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
