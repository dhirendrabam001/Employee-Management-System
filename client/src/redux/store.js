import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import employeeSlice from "./employeeSlice";
import payslipSlice from "./payslipSlice";
import loaderSlice from "./loaderSlice";
import attendanceSlice from "./attendanceSlice";
import leaveSLice from "./leaveSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    employee: employeeSlice,
    payslip: payslipSlice,
    loader: loaderSlice,
    attendance: attendanceSlice,
    leave: leaveSLice,
  },
});

export default store;
