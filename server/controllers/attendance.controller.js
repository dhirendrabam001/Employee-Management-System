const { Attendance } = require("../models/employee.attendance.model");
const { User } = require("../models/user.model");

const attendance = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const {
      taskProject,
      attendanceDate,
      clockInTime,
      workLocation,
      shiftTime,
      notes,
    } = req.body;

    // all field are required validation
    if (
      !taskProject ||
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
    if (!employeeExisting) {
      return res
        .status(404)
        .json({ success: false, message: "Employee is not found" });
    }

    // prevent duplicate data(same data)
    const startOfDay = new Date(attendanceDate);
    startOfDay.setHours(0, 0, 0, 0);

    // end of date
    const endOfDate = new Date(attendanceDate);
    endOfDate.setHours(23, 59, 59, 999);

    // check attendance already or

    const alreadyMarked = await Attendance.findOne({
      employee: employeeId,
      attendanceDate: { $gte: startOfDay, $lte: endOfDate },
    }).select("_id");

    if (alreadyMarked) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked this date",
      });
    }

    // create attendance
    const attendance = await Attendance.create({
      employee: employeeId,
      taskProject,
      attendanceDate,
      clockInTime,
      workLocation,
      shiftTime,
      notes,
    });

    return res.status(201).json({
      success: true,
      attendance,
      message: "Attendance marked successfully!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// get all attendace
const getAllAttendace = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const attendance = await Attendance.find({ employee: employeeId }).sort({
      attendanceDate: -1,
    });

    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance data is found" });
    }

    return res.status(200).json({
      success: true,
      attendance,
      message: "Attendance data fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  attendance,
  getAllAttendace,
};
