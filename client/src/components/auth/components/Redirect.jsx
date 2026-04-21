import { useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaUsers } from "react-icons/fa6";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
const Redirect = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center password-card">
      <div className="card shadow">
        <div className="admin-main d-flex gap-3 align-items-center justify-content-center">
          <div className="icon-info">
            <IoShieldCheckmarkSharp className="icon-design" />
          </div>
          <div className="btn-title text-start mt-2">
            <h6>Admin User</h6>
            <p className="text-secondary">Redirect to admin dashboard</p>
            <button>
              Go to Admin Dashboard
              <FaArrowRightLong className="fa-arrow text-primary fs-6 ms-2 mb-1" />
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted fw-bold">OR</span>
          <hr className="flex-grow-1" />
        </div>
        {/* employee */}
        <div className="admin-main d-flex gap-3 align-items-center justify-content-center">
          <div className="icon-info">
            <FaUsers className="icon-design" />
          </div>
          <div className="btn-title text-start mt-2">
            <h6>Employee User</h6>
            <p className="text-secondary">Redirect to employee dashboard</p>
            <button>
              Go to Employee Dashboard
              <FaArrowRightLong className="fa-arrow text-primary fs-6 mb-1 ms-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redirect;
