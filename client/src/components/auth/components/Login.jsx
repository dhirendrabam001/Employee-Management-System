import { FaArrowRightLong } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-main">
      <div className="card">
        <h2 className="text-center mb-2">
          Welcome <span>Back 👋</span>
        </h2>
        <p className="text-center text-muted">Sign in to your account</p>

        <form>
          <div className="mb-3 position-relative">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control ps-5"
              placeholder="admin@example.com"
            />
            <CgMail className="form-icon" />
          </div>
          <div className="login-btn">
            <button
              type="submit"
              onClick={() => navigate("/admin/password")}
              className="btn btn-primary w-100"
            >
              Continue
            </button>
          </div>
        </form>
        <p className="text-center mt-3 text-muted">
          Don’t have an account?
          <Link className="ms-2" to="/admin/signup">
            Sign up
          </Link>
        </p>

        <div className="link-back text-center">
          <Link to="/" className="text-decoration-none">
            <FaArrowRightLong className="mb-1 me-2" />
            Back To Portals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
