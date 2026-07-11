import { createSlice } from "@reduxjs/toolkit";

const getStoredUser = () => {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = window.localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const persistUser = (user) => {
  if (typeof window === "undefined") return;

  if (user) {
    window.localStorage.setItem("authUser", JSON.stringify(user));
  } else {
    window.localStorage.removeItem("authUser");
    window.localStorage.removeItem("authToken");
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    authChecking: true,
    user: getStoredUser(),
    role: getStoredUser()?.role ?? null,
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload?.user ?? action.payload;
      state.user = user;
      state.role = user?.role ?? null;
      persistUser(user);

      if (action.payload?.token) {
        window.localStorage.setItem("authToken", action.payload.token);
      } else if (!user) {
        window.localStorage.removeItem("authToken");
      }
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
