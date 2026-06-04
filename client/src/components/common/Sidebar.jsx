import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineDashboardCustomize,
  MdSettings,
  MdWork,
  MdEventNote,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserPlus, FaNoteSticky } from "react-icons/fa6";
import DashboardCard from "../ui/DashboardCard";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constantUrl";
import { toast } from "react-toastify";
import { setUser } from "../../redux/authSlice";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const promise = axios.get(
        `${USER_API_END_POINT}/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      toast.promise(promise, {
        pending: "Logout...",
        success: "Logout Successfully",
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Something is wrong";
          },
        },
      });

      const res = await promise;
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <MdOutlineDashboardCustomize />,
    },
    { name: "Employees", path: "/admin/employees", icon: <FaUserPlus /> },
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
    <>
      <button
        type="button"
        className="sidebar-toggle-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <MdMenu />
      </button>

      <div
        className={`sidebar-backdrop ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`d-flex flex-column vh-100 flex-shrink-0 p-3 text-white sidebar-main ${
          isOpen ? "sidebar-open" : ""
        }`}
      >
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <MdClose />
        </button>

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
      {/* Navigation */}
      <h6 className="text-uppercase mt-3">Navigation</h6>
      <ul className="nav flex-column mt-2">
        {menu.map((item, index) => (
          <li className="nav-item" key={index}>
            <Link
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`nav-link d-flex align-items-center gap-2 text-white ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button
          className="btn btn-outline-danger w-100 d-flex align-items-center gap-2 text-white fw-bold text-center"
          onClick={logoutHandler}
        >
          <MdLogout /> Log out
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
