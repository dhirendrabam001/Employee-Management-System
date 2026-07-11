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
  // This covers the gap between component mount and Redux hydration.
  const resolvedUser = user || getStoredUser();

  // If auth is still being checked AND we have no user anywhere, wait.
  // Never redirect to / while authChecking — that causes the iPhone flash.
  if (authChecking && !resolvedUser) {
    return null;
  }

  // No user found anywhere — send to home
  if (!resolvedUser) {
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
