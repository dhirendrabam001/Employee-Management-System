import Sidebar from "../../../common/Sidebar";
import EmployeesDetails from "../components/EmployeesDetails";
const Employees = () => {
  return (
    <div className="dashboard-main">
      <div className="row">
        <div className="col-12 col-md-2 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 col-lg-10">
          <div className="dashboard-right">
            <EmployeesDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
