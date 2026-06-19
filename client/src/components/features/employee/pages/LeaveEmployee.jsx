import Sidebar from "../../../common/Sidebar";
import useEndPageLoader from "../../../../hooks/useEndPageLoader";
import LeaveEmployeeDetails from "../components/LeaveEmployeeDetails";

const LeaveEmployee = () => {
  useEndPageLoader();

  return (
    <div className="dashboard-main">
      <div className="row">
        <div className="col-12 col-md-2 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 col-lg-10">
          <div className="dashboard-right">
            <LeaveEmployeeDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveEmployee;
