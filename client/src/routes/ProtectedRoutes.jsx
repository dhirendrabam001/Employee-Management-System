import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// ---------------------------------------------------------------------------
// ProtectedRoutes — guards pages that require a logged-in user.
//
// Strategy (iPhone-safe):
//   1. Read session from localStorage directly — this is synchronous and
//      always up-to-date. After login, Password.jsx does a full page reload
//      (window.location.href) so localStorage is populated before this ever runs.
//   2. If authChecking is still true (unlikely after the reload strategy) AND
//      localStorage has a session, let the user through — don't block them.
//   3. Only redirect to "/" when there is genuinely no session anywhere.
// ---------------------------------------------------------------------------

const getLocalSession = () => {
  try {
    // Check localStorage first, then sessionStorage (Safari Private Browsing fallback)
    const rawUser =
      window.localStorage.getItem("authUser") ||
      window.sessionStorage.getItem("authUser");
    const token =
      window.localStorage.getItem("authToken") ||
      window.sessionStorage.getItem("authToken");
    const user = rawUser ? JSON.parse(rawUser) : null;
    if (user && token) return { user, token };
    return null;
  } catch {
    return null;
  }
};

const ProtectedRoutes = ({ children, role }) => {
  const { user: reduxUser, authChecking } = useSelector((store) => store.auth);

  // Prefer Redux state (already hydrated from localStorage in authSlice init).
  // Fall back to a direct localStorage read as a safety net.
  const session = reduxUser
    ? {
        user: reduxUser,
        token:
          window.localStorage.getItem("authToken") ||
          window.sessionStorage.getItem("authToken"),
      }
    : getLocalSession();

  // Still checking AND no session anywhere → show blank (don't redirect yet)
  if (authChecking && !session) {
    return null;
  }

  // No session at all → go home
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // Wrong role → redirect to the right dashboard
  if (session.user.role !== role) {
    return (
      <Navigate
        to={session.user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard"}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoutes;
