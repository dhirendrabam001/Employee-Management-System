import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    pageLoading: true,
  },
  reducers: {
    setPageLoading: (state, action) => {
      state.pageLoading = action.payload;
    },
  },
});

export const { setPageLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
