import { createSlice } from "@reduxjs/toolkit";

const payslipSlice = createSlice({
  name: "payslip",
  initialState: {
    payslip: [],
  },
  reducers: {
    setPayslip: (state, action) => {
      state.payslip = action.payload;
    },
  },
});
export const { setPayslip } = payslipSlice.actions;
export default payslipSlice.reducer;
