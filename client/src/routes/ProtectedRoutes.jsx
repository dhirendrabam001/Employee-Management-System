import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * Read the current user from localStorage directly.
 * Used as a fallback when Redux state hasn't hydrated yet — this is
 * especially important on iPhone Safari where the timing between
 * dispatch(setUser()) and React re-rendering is slower.
 */
const getLocalSession = () => {
  try {
    const user = JSON.parse(window.localStorage.getItem("authUser") || "null");
    const token = window.localStorage.getItem("authToken");
    if (user && token) return { user, token };
    return null;
  } catch {
    return null;
  }
};

const ProtectedRoutes = ({ children, role }) => {
  const { user, authChecking } = useSelector((store) => store.auth);

  // Always prefer Redux state. Fall back to localStorage if Redux hasn't
  // received the dispatch yet (happens during navigate() on iPhone because
  // React may render the new route before the state update propagates).
  const session = user
    ? { user, token: window.localStorage.getItem("authToken") }
    : getLocalSession();

  // ── RULE 1: Auth check is still in progress AND we have no session
  // evidence anywhere → show nothing. Do NOT redirect yet.
  // This covers the initial page load case where /me hasn't returned.
  if (authChecking && !session) {
    return null;
  }

  // ── RULE 2: Auth check is still in progress BUT we already have a
  // valid session in localStorage (e.g. just logged in on iPhone,
  // navigate() fired before authChecking was set to false) → let them
  // through immediately. Never block a user who just logged in.
  // This is the core iPhone fix: authChecking can still be true right
  // after navigate() because the /me call hasn't returned yet, but the
  // user is legitimately authenticated.
  if (authChecking && session) {
    // Fall through to the role check below — don't return null or redirect.
  }

  // ── RULE 3: Auth is resolved (or we have a local session) but no user
  // → send to home.
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // ── RULE 4: Wrong role → redirect to the correct dashboard.
  if (session.user.role !== role) {
    if (session.user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/employee/dashboard" replace />;
  }

  // ── RULE 5: All good → render the protected content.
  return children;
};

export default ProtectedRoutes;
