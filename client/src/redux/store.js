import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import employeeSlice from "./employeeSlice";
import payslipSlice from "./payslipSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    employee: employeeSlice,
    payslip: payslipSlice,
  },
});

export default store;
