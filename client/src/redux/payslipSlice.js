import { createSlice } from "@reduxjs/toolkit";

const payslipSlice = createSlice({
  name: "payslip",
  initialState: {
    payslip: [],
    searchName: "",
    selectedPayslipId: null,
    singlePayslipData: null,
  },
  reducers: {
    setPayslip: (state, action) => {
      state.payslip = action.payload;
    },
    setSearchName: (state, action) => {
      state.searchName = action.payload;
    },
    setSelectedPayslipId: (state, action) => {
      state.selectedPayslipId = action.payload;
    },
    setSignlePayslipData: (state, action) => {
      state.singlePayslipData = action.payload;
    },
  },
});
export const {
  setPayslip,
  setSearchName,
  setSelectedPayslipId,
  setSignlePayslipData,
} = payslipSlice.actions;
export default payslipSlice.reducer;
