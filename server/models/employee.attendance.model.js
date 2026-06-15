const mongoose = require("mongoose");
const employeeAttendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    requried: true,
    ref: "User",
  },
  attendanceDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  clockInTime: {
    type: String,
    required: true,
  },
  workLocation: {
    type: String,
    enum: ["office", "remote", "hybrid", "client-site"],
    requried: true,
  },
  shiftTime: {
    type: String,
    trim: true,
    requried: true,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ["present", "absent", "leave"],
    default: "present",
  },
  totalWorkingHrs: {
    type: Number,
    default: 0,
  },
});

const Attendance = mongoose.model("attendance", employeeAttendanceSchema);

module.exports = {
  Attendance,
};
