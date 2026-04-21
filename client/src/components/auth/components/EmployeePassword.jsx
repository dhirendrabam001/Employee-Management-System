import { FaArrowRightLong } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const EmployeePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center password-card">
      <div className="card shadow">
        <div className="heading">
          <h2 className="text-center mb-2">
            Welcome <span>Back 👋</span>
          </h2>
          <p className="text-center text-muted">Sign in to your account</p>
        </div>
        <div className="d-flex align-items-center justify-content-between py-4">
          <div className="password-heading">
            <h6>example@gmail.com</h6>
          </div>
          <div className="password-edit">
            <Link className="edit">Edit</Link>
          </div>
        </div>

        <form>
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control ps-5"
              placeholder="Create a password"
            />
            <TbLockPassword className="form-icon" />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3 eyes"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="login-btn py-2">
            <button
              type="submit"
              onClick={() => navigate("/verify")}
              className="btn btn-primary w-100"
            >
              Sign in
            </button>
          </div>
          <div className="form-check mb-3 d-flex align-items-center justify-content-between mt-2">
            <div className="password-input">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
              />
              <label htmlFor="input">Remender Me</label>
            </div>
            <div>
              <Link>Forget Password?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePassword;
