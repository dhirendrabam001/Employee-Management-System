const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    date: { type: Date },
    bio: { type: String, required: true, trim: true },
    department: { type: String },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    allowance: { type: Number, default: 0 },
    deduction: { type: String, default: 0 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "employee"],
    },
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", employeesSchema);

module.exports = {
  Employee,
};
