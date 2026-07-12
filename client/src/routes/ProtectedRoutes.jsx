import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getStoredToken } from "../redux/authSlice";

const ProtectedRoutes = ({ children, role }) => {
  const { user, authChecking } = useSelector((store) => store.auth);

  // getStoredToken() checks memory → localStorage → sessionStorage in order.
  // This works even in Safari Private Browsing where localStorage is blocked,
  // because the in-memory token is set in the same JS session (no page reload).
  const token = getStoredToken();

  // Auth still in progress and no user anywhere — show blank, don't redirect
  if (authChecking && !user) {
    return null;
  }

  // No user or no token — send to home
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  // Wrong role — redirect to the correct dashboard
  if (user.role !== role) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard"}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoutes;
