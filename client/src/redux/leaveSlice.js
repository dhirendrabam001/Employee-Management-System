import { createSlice } from "@reduxjs/toolkit";

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    leave: [],
    leaveAllEmployee: [],
  },
  reducers: {
    setLeave: (state, action) => {
      state.leave = action.payload;
    },
    setLeaveAllEmployee: (state, action) => {
      state.leaveAllEmployee = action.payload;
    },
  },
});

export const { setLeave, setLeaveAllEmployee } = leaveSlice.actions;
export default leaveSlice.reducer;
