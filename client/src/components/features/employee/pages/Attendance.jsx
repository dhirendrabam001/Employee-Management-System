import Sidebar from "../../../common/Sidebar";
import AttendanceDetails from "../components/AttendanceDetails";
import useEndPageLoader from "../../../../hooks/useEndPageLoader";

const Attendance = () => {
  useEndPageLoader();

  return (
    <div className="dashboard-main">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 col-lg-10">
          <div className="dashboard-right">
            <AttendanceDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

const data = () => {};
