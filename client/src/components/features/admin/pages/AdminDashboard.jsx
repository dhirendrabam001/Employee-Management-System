import Sidebar from "../../../common/Sidebar";
import AdminCard from "../../../ui/AdminCard";

const AdminDashboard = () => {
  return (
    <div className="dashboard-main">
      <div className="row">
        <div className="col-12 col-md-2 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 col-lg-10">
          <div className="dashboard-right">
            <AdminCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
