import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const getStoredUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem("authUser") || "null");
  } catch {
    return null;
  }
};

const ProtectedRoutes = ({ children, role }) => {
  const { user, authChecking } = useSelector((store) => store.auth);

  // Resolve user from Redux state first, fall back to localStorage.
  // This covers the gap between component mount and Redux hydration,
  // and the case where iPhone Safari blocks the session cookie so the
  // /me call returns 401 before Password.jsx has dispatched setUser.
  const resolvedUser = user || getStoredUser();
  const resolvedToken = window.localStorage.getItem("authToken");

  // If auth is still being checked AND we have no user anywhere, wait.
  // Never redirect to / while authChecking — that causes the iPhone flash.
  if (authChecking && !resolvedUser) {
    return null;
  }

  // No user found anywhere — send to home.
  // Also verify the token exists; without it there's no valid session.
  if (!resolvedUser || !resolvedToken) {
    return <Navigate to="/" replace />;
  }

  // User exists but wrong role — redirect to their correct dashboard
  if (resolvedUser.role !== role) {
    if (resolvedUser.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/employee/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoutes;
