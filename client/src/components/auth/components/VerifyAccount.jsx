import { Link, useNavigate } from "react-router-dom";
import { BiSolidShieldAlt2 } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    // check user comming or not
    if (!user) {
      navigate("/admin/login");
      return;
    }

    const timer = setTimeout(() => {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    }, 2500);
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
            Verifying {user?.role} <span>account…</span>
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

export default VerifyAccount;
