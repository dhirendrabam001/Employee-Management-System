import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    authChecking: true,
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
    setAuthChecking: (state, action) => {
      state.authChecking = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setUser, setEmail, setLoading, setAuthChecking } =
  authSlice.actions;

export default authSlice.reducer;
