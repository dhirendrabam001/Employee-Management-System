const mongoose = require("mongoose");

const payslipSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    allowances: {
      type: Number,
      default: 0,
    },
    deductions: {
      type: Number,
      default: 0,
    },

    netSalary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Processing"],
      default: "Paid",
    },
  },
  { timestamps: true },
);

const Payslips = mongoose.model("payslips", payslipSchema);

module.exports = { Payslips };
