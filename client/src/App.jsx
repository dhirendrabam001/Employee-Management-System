import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./Responsive.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import HeroSection from "./features/home/pages/HeroSection";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginSection from "./components/auth/pages/LoginSection";
import SignUpSection from "./components/auth/pages/SignUpSection";
import PasswordSection from "./components/auth/pages/PasswordSection";
import VerifyAccountSection from "./components/auth/pages/VerifyAccountSection";
import EmployeeLoginSection from "./components/auth/pages/EmployeeLoginSection";
import EmployeePasswordSection from "./components/auth/pages/EmployeePasswordSection";
import EmployeeSignUpSection from "./components/auth/pages/EmployeeSignUpSection";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "./utils/constantUrl";
import { setAuthChecking, setUser } from "./redux/authSlice";
import { setPageLoading } from "./redux/loaderSlice";
import { handleSessionExpired } from "./utils/sessionExpired";
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
import LeaveEmployee from "./components/features/employee/pages/LeaveEmployee";
import EmployeePayslip from "./components/features/employee/pages/EmployeePayslip";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { authChecking, user } = useSelector((store) => store.auth);
  const { pageLoading } = useSelector((store) => store.loader);
  const showLoader =
    pageLoading || (authChecking && shouldShowRouteLoader(location.pathname));

  useLayoutEffect(() => {
    if (shouldShowRouteLoader(location.pathname)) {
      dispatch(setPageLoading(true));
    }
  }, [dispatch, location.pathname]);

  // If the current route is a skip-route (auth/home pages), hide the loader immediately
  useEffect(() => {
    if (!shouldShowRouteLoader(location.pathname)) {
      dispatch(setPageLoading(false));
    }
    // keep intentional empty dependency; reactively handle pathname above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser =
        typeof window !== "undefined"
          ? JSON.parse(window.localStorage.getItem("authUser") || "null")
          : null;

      if (storedUser && !user) {
        dispatch(setUser(storedUser));
      }

      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
          validateStatus: () => true,
        });

        if (res.status === 200) {
          dispatch(setUser(res.data.user));
        } else if (res.status === 401) {
          if (user || storedUser) {
            return;
          }

          dispatch(setUser(null));

          // Token expired → go to home page
          const msg = res.data?.message || "";
          if (msg.toLowerCase().includes("expired")) {
            await handleSessionExpired(msg);
          }
        } else {
          if (!user && !storedUser) {
            dispatch(setUser(null));
          }
        }
      } catch {
        if (!user) {
          const persistedUser =
            typeof window !== "undefined"
              ? JSON.parse(window.localStorage.getItem("authUser") || "null")
              : null;

          if (!persistedUser) {
            dispatch(setUser(null));
          }
        }
      } finally {
        dispatch(setAuthChecking(false));
      }
    };
    fetchUser();
  }, [dispatch, user]);

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
          <Route
            path="/admin/employees"
            element={
              <ProtectedRoutes role="admin">
                <Employees />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/leave"
            element={
              <ProtectedRoutes role="admin">
                <Leave />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/payslips"
            element={
              <ProtectedRoutes role="admin">
                <Payslips />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/payslip/print/:id"
            element={
              <ProtectedRoutes role="admin">
                <PrintPayslip />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/setting"
            element={
              <ProtectedRoutes role="admin">
                <Settings />
              </ProtectedRoutes>
            }
          />

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
            path="/employee/leave"
            element={
              <ProtectedRoutes role="employee">
                <LeaveEmployee />
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
          <Route
            path="/employee/attendance"
            element={
              <ProtectedRoutes role="employee">
                <Attendance />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/employee/payslips"
            element={
              <ProtectedRoutes role="employee">
                <EmployeePayslip />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/employee/payslip/:id"
            element={
              <ProtectedRoutes role="employee">
                <PrintPayslip />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/employee/setting"
            element={
              <ProtectedRoutes role="employee">
                <Settings />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
