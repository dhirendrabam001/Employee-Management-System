import { Link, useNavigate } from "react-router-dom";
import { BiSolidShieldAlt2 } from "react-icons/bi";

const VerifyAccount = () => {
  const navigate = useNavigate();
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

export default VerifyAccount;
