import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    attendance: [],
  },
  reducers: {
    setAttendance: (state, action) => {
      state.attendance = action.payload;
    },
  },
});

export const { setAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
