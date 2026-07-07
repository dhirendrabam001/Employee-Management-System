import Sidebar from "../../../common/Sidebar";
import useEndPageLoader from "../../../../hooks/useEndPageLoader";
import EmployeePayslipDetails from "../components/EmployeePayslipDetails";

const EmployeePayslip = () => {
  useEndPageLoader();

  return (
    <div className="dashboard-main">
      <div className="row">
        <div className="col-12 col-md-2 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 col-lg-10">
          <div className="dashboard-right">
            <EmployeePayslipDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePayslip;
