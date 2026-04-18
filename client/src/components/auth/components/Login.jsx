import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="link-back">
        <Link to="/" className="text-decoration-none">
          <FaArrowRightLong className="mb-1 me-2" />
          Back To Portals
        </Link>
      </div>
      <div>
        <h2>Admin Portal</h2>
        <p>
          Sign in to securely manage your organization’s resources and settings.
        </p>
      </div>
    </div>
  );
};

export default Login;
