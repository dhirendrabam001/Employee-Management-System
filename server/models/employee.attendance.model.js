const mongoose = require("mongoose");
const employeeAttendanceSchema = new mongoose.Schema(
  {
    taskProject: {
      type: String,
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
      required: true,
    },
    shiftTime: {
      type: String,
      trim: true,
      required: true,
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
  },
  { timestamps: true },
);

const Attendance = mongoose.model("attendance", employeeAttendanceSchema);

module.exports = {
  Attendance,
};
