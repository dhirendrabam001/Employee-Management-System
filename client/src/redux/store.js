import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import employeeSlice from "./employeeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    employee: employeeSlice,
  },
});

export default store;
