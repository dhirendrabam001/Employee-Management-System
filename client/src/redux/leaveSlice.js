import { createSlice } from "@reduxjs/toolkit";

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    leave: [],
    leaveAllEmployee: [],
    searchLeaveText: "",
    statusFilter: "all",
  },
  reducers: {
    setLeave: (state, action) => {
      state.leave = action.payload;
    },
    setLeaveAllEmployee: (state, action) => {
      state.leaveAllEmployee = action.payload;
    },
    setSearchLeaveText: (state, action) => {
      state.searchLeaveText = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
  },
});

export const {
  setLeave,
  setLeaveAllEmployee,
  setSearchLeaveText,
  setStatusFilter,
} = leaveSlice.actions;
export default leaveSlice.reducer;
