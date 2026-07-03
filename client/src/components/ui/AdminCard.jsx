import { useSelector } from "react-redux";
import { FiUsers } from "react-icons/fi";
import { FaBuildingUser, FaCalendarCheck } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import useGetAllAttendance from "../../hooks/useGetAllAttendance";
import useGetEmployeeLeave from "../../hooks/useGetEmployeeLeave";

const AdminCard = () => {
  const { user } = useSelector((store) => store.auth);
  const { employee } = useSelector((store) => store.employee);
  const { attendance } = useSelector((store) => store.attendance);
  const { leaveAllEmployee } = useSelector((store) => store.leave);

  useGetAllAttendance();
  useGetEmployeeLeave();

  const totalEmployee = employee?.length || 0;
  const departmentsCount = new Set(
    employee?.map((item) => item.department?.trim()).filter(Boolean),
  ).size;
  const todayString = new Date().toLocaleDateString();
  const todayAttendance = attendance?.filter((item) => {
    const attendanceDate = item.attendanceDate || item.createdAt || item.date;
    return (
      attendanceDate &&
      new Date(attendanceDate).toLocaleDateString() === todayString &&
      item.status?.toLowerCase() === "present"
    );
  }).length;
  const pendingLeaves = leaveAllEmployee?.filter(
    (item) => item.status?.toLowerCase() === "pending",
  ).length;

  return (
    <div className="admin-card">
      <div className="container">
        <div className="mb-2">
          <h2>Welcome Back, {user?.fullName}!</h2>
          <p className="fw-semibold">Mern Stack Developer</p>
        </div>
        <div className="row align-items-center g-4 mt-3">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card-info d-flex align-items-center justify-content-between">
              <div className="card-heading">
                <h6 className="text-muted">Total Employees</h6>
                <h2 className="fw-bold">{totalEmployee}</h2>
              </div>
              <div className="card-icon">
                <FiUsers className="icon-user" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card-info d-flex align-items-center justify-content-between">
              <div className="card-heading">
                <h6 className="text-muted">Departments</h6>
                <h2 className="fw-bold">{departmentsCount}</h2>
              </div>
              <div className="card-icon">
                <FaBuildingUser className="icon-user" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card-info d-flex align-items-center justify-content-between">
              <div className="card-heading">
                <h6 className="text-muted">Today's Attendance</h6>
                <h2 className="fw-bold">{todayAttendance}</h2>
              </div>
              <div className="card-icon">
                <FaCalendarCheck className="icon-user" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card-info d-flex align-items-center justify-content-between">
              <div className="card-heading">
                <h6 className="text-muted">Pending Leaves</h6>
                <h2 className="fw-bold">{pendingLeaves}</h2>
              </div>
              <div className="card-icon">
                <FaFileAlt className="icon-user" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
