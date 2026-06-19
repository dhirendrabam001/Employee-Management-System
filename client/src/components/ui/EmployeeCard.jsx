import { useSelector } from "react-redux";
import {
 
  FaCalendarCheck,
  FaArrowRightLong,
} from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const EmployeeCard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const formatRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "";
  return (
    <div className="admin-card">
      <div className="container">
        <div className="mb-2">
          <h2>Welcome Back, {user?.fullName}!</h2>
          <p className="fw-semibold">{formatRole}</p>
        </div>
        <div className="row align-items-center g-4 mt-3">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card-info d-flex align-items-center justify-content-between">
              <div className="card-heading">
                <h6 className="text-muted">Days Present</h6>
                <h2 className="fw-bold">10</h2>
              </div>
              <div className="card-icon">
                <FaCalendarCheck className="icon-user" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card-info d-flex align-items-center justify-content-between">
              <div className="card-heading">
                <h6 className="text-muted">Pending Leaves</h6>
                <h2 className="fw-bold">15</h2>
              </div>
              <div className="card-icon">
                <FaFileAlt className="icon-user" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card-info d-flex align-items-center justify-content-between">
              <div className="card-heading">
                <h6 className="text-muted">Latest Paysplis</h6>
                <h2 className="fw-bold">10</h2>
              </div>
              <div className="card-icon">
                <HiCurrencyDollar className="icon-user" />
              </div>
            </div>
          </div>
        </div>

        <div className="employee-btn d-flex align-items-center gap-3">
          <div className="mark-btn">
            <button type="submit" onClick={() => navigate("/employee/attendance")} className="d-flex align-items-center gap-3">
              Mark Attendance <FaArrowRightLong className="mt-1" />
            </button>
          </div>
          <div className="leave-btn">
            <button type="submit" className="d-flex align-items-center gap-3">
              Apply Leave <FaArrowRightLong className="mt-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
