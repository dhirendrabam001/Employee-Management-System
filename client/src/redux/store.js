import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import employeeSlice from "./employeeSlice";
import payslipSlice from "./payslipSlice";
import loaderSlice from "./loaderSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    employee: employeeSlice,
    payslip: payslipSlice,
    loader: loaderSlice,
  },
});

export default store;
