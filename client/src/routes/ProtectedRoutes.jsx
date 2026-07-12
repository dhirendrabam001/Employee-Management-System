import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getStoredToken } from "../redux/authSlice";

const ProtectedRoutes = ({ children, role }) => {
  const { user, authChecking } = useSelector((store) => store.auth);
  const token = getStoredToken();

  // --- Grace period ---
  // On the very first render after navigate(), Redux may not have committed
  // the setUser dispatch yet (iOS Safari renders routes faster than Redux
  // can flush). We give a 300ms grace window before allowing a redirect to /.
  // If user + token appear within that window, we let them through.
  const [grace, setGrace] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    // If we already have a valid session, no need for a grace period
    if (user && token) {
      setGrace(false);
      return;
    }
    // Start grace period — don't redirect for 300ms
    timerRef.current = setTimeout(() => setGrace(false), 300);
    return () => clearTimeout(timerRef.current);
  }, [user, token]);

  // Have a valid session — let through immediately
  if (user && token) {
    if (user.role !== role) {
      return (
        <Navigate
          to={user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard"}
          replace
        />
      );
    }
    return children;
  }

  // Still in grace window or auth is being checked — show nothing, don't redirect
  if (grace || authChecking) {
    return null;
  }

  // Grace period over, auth done, still no session — go home
  return <Navigate to="/" replace />;
};

export default ProtectedRoutes;
