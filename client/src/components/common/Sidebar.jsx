import { useSelector } from "react-redux";
import {
  MdOutlineDashboardCustomize,
  MdSettings,
  MdWork,
  MdEventNote,
  MdLogout,
} from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { FaUserPlus, FaNoteSticky } from "react-icons/fa6";
import DashboardCard from "../ui/DashboardCard";
const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((store) => store.auth);

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <MdOutlineDashboardCustomize />,
    },
    { name: "Employee", path: "/admin/employee", icon: <FaUserPlus /> },
    { name: "Leave", path: "/admin/leave", icon: <FaNoteSticky /> },
    { name: "Payslips", path: "/admin/payslips", icon: <HiCurrencyDollar /> },
    { name: "Setting", path: "/admin/setting", icon: <MdSettings /> },
  ];

  const employeeMenu = [
    {
      name: "Dashboard",
      path: "/employee/dashboard",
      icon: <MdOutlineDashboardCustomize />,
    },
    { name: "Attendance", path: "/employee/attendance", icon: <MdWork /> },
    { name: "Leave", path: "/employee/leave", icon: <MdEventNote /> },
    {
      name: "Payslips",
      path: "/employee/payslips",
      icon: <HiCurrencyDollar />,
    },
    { name: "Settings", path: "/employee/settings", icon: <MdSettings /> },
  ];

  const menu = user?.role === "admin" ? adminMenu : employeeMenu;

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white sidebar-main">
      <div className="sidebar-heading d-flex align-items-center gap-2">
        <div className="icon-dashboard">
          <FiUser className="icon" />
        </div>
        <div className="sidebar-content">
          <h6>Employee MS</h6>
          <p>Employee Management</p>
        </div>
      </div>
      <hr />
      <DashboardCard />
      <div className="main-sidebar">
        <h6 className="text-uppercase">Navigation</h6>
        <ul className="nav flex-column mt-2">
          {menu.map((item, index) => (
            <li className="nav-item" key={index}>
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center gap-2 ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div className="logout-btn">
          <button type="submit">
            <MdLogout /> Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
