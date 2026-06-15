import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./Responsive.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import HeroSection from "./features/home/pages/HeroSection";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginSection from "./components/auth/pages/LoginSection";
import SignUpSection from "./components/auth/pages/SignUpSection";
import PasswordSection from "./components/auth/pages/PasswordSection";
import VerifyAccountSection from "./components/auth/pages/VerifyAccountSection";
import EmployeeLoginSection from "./components/auth/pages/EmployeeLoginSection";
import EmployeePasswordSection from "./components/auth/pages/EmployeePasswordSection";
import EmployeeSignUpSection from "./components/auth/pages/EmployeeSignUpSection";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "./utils/constantUrl";
import { setAuthChecking, setUser } from "./redux/authSlice";
import { setPageLoading } from "./redux/loaderSlice";
import { showError } from "./utils/toast";
import { shouldShowRouteLoader } from "./utils/loaderRoutes";
import Dashboard from "./components/features/admin/pages/Dashboard";
import Employees from "./components/features/admin/pages/Employees";
import Leave from "./components/features/admin/pages/Leave";
import Payslips from "./components/features/admin/pages/Payslips";
import PrintPayslip from "./components/features/admin/components/PrintPayslip";
import Settings from "./components/features/admin/pages/Settings";

// import PageLoader from "./components/common/Loader/PageLoader";
import CubeLoader from "./components/common/Loader/CubeLoader";

// employee pages
import Attendance from "./components/features/employee/pages/Attendance";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { authChecking } = useSelector((store) => store.auth);
  const { pageLoading } = useSelector((store) => store.loader);
  const showLoader =
    pageLoading || (authChecking && shouldShowRouteLoader(location.pathname));

  useEffect(() => {
    if (shouldShowRouteLoader(location.pathname)) {
      dispatch(setPageLoading(true));
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
          validateStatus: () => true,
        });

        if (res.status === 200) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        dispatch(setUser(null));
        showError(error.response?.data?.message || "Unable to verify session");
      } finally {
        dispatch(setAuthChecking(false));
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <>
      {showLoader && <CubeLoader />}
      <div className="full-layout">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<HeroSection />}></Route>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoutes role="admin">
                <Dashboard />
              </ProtectedRoutes>
            }
          ></Route>
          <Route path="/admin/login" element={<LoginSection />}></Route>
          <Route path="/admin/signup" element={<SignUpSection />}></Route>
          <Route path="/admin/password" element={<PasswordSection />}></Route>
          <Route path="/verify" element={<VerifyAccountSection />}></Route>

          {/* admin pages */}
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/leave" element={<Leave />}></Route>
          <Route path="/admin/payslips" element={<Payslips />}></Route>
          <Route
            path="/admin/payslip/print/:id"
            element={<PrintPayslip />}
          ></Route>
          <Route path="/admin/setting" element={<Settings />}></Route>

          {/* employee routes */}
          <Route
            path="/employee/login"
            element={<EmployeeLoginSection />}
          ></Route>
          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoutes role="employee">
                <Dashboard />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/employee/password"
            element={<EmployeePasswordSection />}
          ></Route>

          <Route
            path="/employee/signup"
            element={<EmployeeSignUpSection />}
          ></Route>

          {/* Employee pages */}
          <Route path="/employee/attendance" element={<Attendance />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
