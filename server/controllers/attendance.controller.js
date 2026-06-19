const { Attendance } = require("../models/employee.attendance.model");
const { User } = require("../models/user.model");

const clockIn = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { taskProject, workLocation, shiftTime, notes } = req.body;

    // all field are required validation
    if (!taskProject || !workLocation || !shiftTime) {
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

    // prevent duplicate data(same data) - use today's date range
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    // end of date
    const endOfDate = new Date(today);
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
      attendanceDate: new Date(),
      clockInTime: new Date(),
      workLocation,
      shiftTime,
      notes,
      isClockedIn: true,
    });

    return res.status(201).json({
      success: true,
      attendance,
      message: "Clock in successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// start timer for a specific attendance row
const startTimer = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { id } = req.params;

    const record = await Attendance.findOne({ _id: id, employee: employeeId });
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    if (record.isClockedIn) {
      return res.status(400).json({
        success: false,
        message: "Timer is already running for this record",
      });
    }

    const otherActive = await Attendance.findOne({
      employee: employeeId,
      isClockedIn: true,
      _id: { $ne: id },
    });

    if (otherActive) {
      return res.status(400).json({
        success: false,
        message: "Please stop the current timer first",
      });
    }

    record.isClockedIn = true;
    record.clockInTime = new Date();
    record.clockOutTime = null;
    await record.save();

    return res.status(200).json({
      success: true,
      attendance: record,
      message: "Timer started successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// clock out attendace
const clockOut = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const attendance = await Attendance.findOne({
      employee: employeeId,
      isClockedIn: true,
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "No active attendance found",
      });
    }

    const clockOutTime = new Date();

    const totalMilliseconds = clockOutTime - attendance.clockInTime;

    const totalWorkingHrs = totalMilliseconds / (1000 * 60 * 60);

    attendance.clockOutTime = clockOutTime;
    attendance.totalWorkingHrs = Number(totalWorkingHrs.toFixed(2));
    attendance.isClockedIn = false;

    await attendance.save();

    return res.status(200).json({
      success: true,
      attendance,
      message: "Clock out successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get today attendance
const getTodayAttendance = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const attendance = await Attendance.findOne({
      employee: employeeId,
      attendanceDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    return res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get all attendace
const getAllAttendace = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const attendance = await Attendance.find({ employee: employeeId }).sort({
      attendanceDate: -1,
    });

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
  clockIn,
  clockOut,
  startTimer,
  getTodayAttendance,
  getAllAttendace,
};
