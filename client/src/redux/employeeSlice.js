import { createSlice } from "@reduxjs/toolkit";
const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: [],
    selectedEmployeeId: null,
    singleEmployeeData: [],
  },
  reducers: {
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    setSelectedEmployeeId: (state, action) => {
      state.selectedEmployeeId = action.payload;
    },
    setSingleEmployeeData: (state, action) => {
      state.singleEmployeeData = action.payload;
    },
  },
});

export const { setEmployee, setSelectedEmployeeId, setSingleEmployeeData } =
  employeeSlice.actions;

export default employeeSlice.reducer;
