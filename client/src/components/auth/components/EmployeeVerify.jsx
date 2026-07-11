import { useNavigate } from "react-router-dom";
import { BiSolidShieldAlt2 } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const EmployeeVerify = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    // If no user in state, check localStorage before redirecting
    const storedUser = (() => {
      try {
        return JSON.parse(window.localStorage.getItem("authUser") || "null");
      } catch {
        return null;
      }
    })();

    const resolvedUser = user || storedUser;

    if (!resolvedUser) {
      navigate("/employee/login");
      return;
    }

    const timer = setTimeout(() => {
      if (resolvedUser.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/employee/dashboard", { replace: true });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center password-card">
      <div className="card shadow">
        <div className="verify-icons text-center">
          <BiSolidShieldAlt2 className="icons" />
        </div>
        <div className="text-center verify-heading">
          <h5 className="mb-2">
            Verifying your <span>account…</span>
          </h5>
          <p className="text-muted">
            Please wait while we securely
            <br /> verify your credentials.
          </p>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeVerify;
