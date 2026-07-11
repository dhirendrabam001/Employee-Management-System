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

  // While auth is resolving, check localStorage so we don't flash-redirect to /
  if (authChecking) {
    const storedUser = getStoredUser();
    // If there's a persisted user, render nothing (loader will show) rather
    // than immediately redirecting to home
    if (storedUser) return null;
    // No stored user either — safe to show nothing until check completes
    return null;
  }

  // Use Redux user; fall back to localStorage in case Redux hasn't hydrated yet
  const resolvedUser = user || getStoredUser();

  if (!resolvedUser) {
    return <Navigate to="/" replace />;
  }

  if (resolvedUser.role !== role) {
    if (resolvedUser.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/employee/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoutes;
