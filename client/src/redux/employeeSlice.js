import { createSlice } from "@reduxjs/toolkit";
const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: [],
    selectedEmployeeId: null,
    singleEmployeeData: [],
    searchText: "",
    searchDepartment: null,
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
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSearchDepartment: (state, action) => {
      state.searchDepartment = action.payload;
    },
  },
});

export const {
  setEmployee,
  setSelectedEmployeeId,
  setSingleEmployeeData,
  setSearchText,
  setSearchDepartment,
} = employeeSlice.actions;

export default employeeSlice.reducer;
