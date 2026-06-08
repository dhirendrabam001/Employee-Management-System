import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    role: null,
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload?.role;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setEmail, setLoading } = authSlice.actions;

export default authSlice.reducer;
