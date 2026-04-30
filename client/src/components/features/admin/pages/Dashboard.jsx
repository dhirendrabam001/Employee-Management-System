import Sidebar from "../../../common/Sidebar";
import AdminCard from "../../../ui/AdminCard";
import { useSelector } from "react-redux";
import EmployeeCard from "../../../ui/EmployeeCard";

const Dashboard = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="dashboard-main">
      <div className="row">
        <div className="col-12 col-md-2 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 col-lg-10">
          <div className="dashboard-right">
            {user.role === "admin" ? <AdminCard /> : <EmployeeCard />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
