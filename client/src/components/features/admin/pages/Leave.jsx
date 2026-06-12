import Sidebar from "../../../common/Sidebar";
import LeaveDetails from "../components/LeaveDetails";
import useEndPageLoader from "../../../../hooks/useEndPageLoader";

const Leave = () => {
  useEndPageLoader();

  return (
    <div className="dashboard-main">
      <div className="row">
        <div className="col-12 col-md-2 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 col-lg-10">
          <div className="dashboard-right">
            <LeaveDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave;
