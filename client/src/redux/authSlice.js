import { createSlice } from "@reduxjs/toolkit";

const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  try {
    // Try localStorage first, fall back to sessionStorage (for Safari Private Browsing
    // which blocks localStorage entirely — writes silently fail or throw)
    const raw =
      window.localStorage.getItem("authUser") ||
      window.sessionStorage.getItem("authUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const persistUser = (user) => {
  if (typeof window === "undefined") return;
  if (user) {
    try {
      window.localStorage.setItem("authUser", JSON.stringify(user));
    } catch {
      // localStorage blocked (e.g. Safari Private Browsing) — fall back to sessionStorage
      try { window.sessionStorage.setItem("authUser", JSON.stringify(user)); } catch { /* ignore */ }
    }
  } else {
    try { window.localStorage.removeItem("authUser"); } catch { /* ignore */ }
    try { window.localStorage.removeItem("authToken"); } catch { /* ignore */ }
    try { window.sessionStorage.removeItem("authUser"); } catch { /* ignore */ }
    try { window.sessionStorage.removeItem("authToken"); } catch { /* ignore */ }
  }
};

const storedUser = getStoredUser();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    // If we already have a user in localStorage, no need to show a
    // "checking" state — the user is already known. This prevents the
    // flash-redirect to / on page load / route navigation on mobile.
    authChecking: !storedUser,
    user: storedUser,
    role: storedUser?.role ?? null,
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload?.user ?? action.payload;
      state.user = user;
      state.role = user?.role ?? null;
      persistUser(user);

      if (action.payload?.token) {
        try {
          window.localStorage.setItem("authToken", action.payload.token);
        } catch {
          try { window.sessionStorage.setItem("authToken", action.payload.token); } catch { /* ignore */ }
        }
      } else if (!user) {
        try { window.localStorage.removeItem("authToken"); } catch { /* ignore */ }
        try { window.sessionStorage.removeItem("authToken"); } catch { /* ignore */ }
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
