const mongoose = require("mongoose");
const employeeAttendanceSchema = new mongoose.Schema(
  {
    taskProject: {
      type: String,
      required: true,
      trim: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    attendanceDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    clockInTime: {
      type: Date,
      default: null,
    },
    clockOutTime: {
      type: Date,
      default: null,
    },
    isClockedIn: {
      type: Boolean,
      default: false,
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
      trim: true,
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
