import { createSlice } from "@reduxjs/toolkit";

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    leave: [],
  },
  reducers: {
    setLeave: (state, action) => {
      state.leave = action.payload;
    },
  },
});

export const { setLeave } = leaveSlice.actions;
export default leaveSlice.reducer;
