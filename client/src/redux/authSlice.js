import { createSlice } from "@reduxjs/toolkit";

// ─── In-memory session store ────────────────────────────────────────────────
// This is the primary store for the auth session. It works in ALL browsers
// including Safari Private Browsing (which blocks localStorage/sessionStorage).
// It survives React re-renders and route changes, but resets on page reload —
// which is fine because we only use window.location.href after logout.
let memoryUser = null;
let memoryToken = null;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const safeLocalGet = (key) => {
  try { return window.localStorage.getItem(key); } catch { return null; }
};

const safeLocalSet = (key, value) => {
  try { window.localStorage.setItem(key, value); } catch { /* blocked in private browsing */ }
};

const safeLocalRemove = (key) => {
  try { window.localStorage.removeItem(key); } catch { /* ignore */ }
};

const safeSessionGet = (key) => {
  try { return window.sessionStorage.getItem(key); } catch { return null; }
};

const safeSessionSet = (key, value) => {
  try { window.sessionStorage.setItem(key, value); } catch { /* ignore */ }
};

const safeSessionRemove = (key) => {
  try { window.sessionStorage.removeItem(key); } catch { /* ignore */ }
};

// Read user from any available storage (localStorage → sessionStorage → null)
const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  // Check in-memory first (fastest, works in private browsing after first load)
  if (memoryUser) return memoryUser;
  try {
    const raw = safeLocalGet("authUser") || safeSessionGet("authUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const getStoredToken = () => {
  if (memoryToken) return memoryToken;
  return safeLocalGet("authToken") || safeSessionGet("authToken") || null;
};

// Persist user to all available storages
const persistUser = (user) => {
  if (typeof window === "undefined") return;
  memoryUser = user || null;
  if (user) {
    const json = JSON.stringify(user);
    safeLocalSet("authUser", json);
    safeSessionSet("authUser", json); // belt-and-suspenders for private browsing
  } else {
    safeLocalRemove("authUser");
    safeLocalRemove("authToken");
    safeSessionRemove("authUser");
    safeSessionRemove("authToken");
    memoryToken = null;
  }
};

const persistToken = (token) => {
  memoryToken = token || null;
  if (token) {
    safeLocalSet("authToken", token);
    safeSessionSet("authToken", token); // belt-and-suspenders for private browsing
  }
};

// ─── Slice ───────────────────────────────────────────────────────────────────

const storedUser = getStoredUser();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    // authChecking: false when we already have a user — no need to wait.
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
        persistToken(action.payload.token);
      } else if (!user) {
        persistToken(null);
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
