import { useSelector } from "react-redux";
const DashboardCard = () => {
  const { user } = useSelector((store) => store.auth);
  const formatRole = user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1);
  const firstLetter = user?.role?.charAt(0).toUpperCase();

  return (
    <div className="dashboard-card d-flex align-items-center gap-2">
      <div className="dashobard-heading">
        <span>{firstLetter}</span>
      </div>
      <div className="dashobard-heading">
        <h6>{formatRole}</h6>
        <p>Administrator</p>
      </div>
    </div>
  );
};

export default DashboardCard;
