import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoutes = ({ children, role }) => {
  const { user } = useSelector((store) => store.auth);

  // don't redirect immediately on null
  if (user === null) {
    return null; // wait for useEffect to run
  }

  if (!user) {
    if (role === "admin") {
      return <Navigate to="/admin/login"></Navigate>;
    } else {
      return <Navigate to="/employee/login"></Navigate>;
    }
  }

  if (user.role !== role) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard"></Navigate>;
    } else {
      return <Navigate to="/employee/dashboard"></Navigate>;
    }
  }

  return children;
};

export default ProtectedRoutes;
