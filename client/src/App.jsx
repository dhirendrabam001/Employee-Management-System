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
import { shouldShowRouteLoader, SKIP_LOADER_ROUTES } from "./utils/loaderRoutes";
import Dashboard from "./components/features/admin/pages/Dashboard";
import Employees from "./components/features/admin/pages/Employees";
import Leave from "./components/features/admin/pages/Leave";
import Payslips from "./components/features/admin/pages/Payslips";
import PrintPayslip from "./components/features/admin/components/PrintPayslip";
import Settings from "./components/features/admin/pages/Settings";

import CubeLoader from "./components/common/Loader/CubeLoader";

// employee pages
import Attendance from "./components/features/employee/pages/Attendance";
import LeaveEmployee from "./components/features/employee/pages/LeaveEmployee";
import EmployeePayslip from "./components/features/employee/pages/EmployeePayslip";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { authChecking } = useSelector((store) => store.auth);
  const { pageLoading } = useSelector((store) => store.loader);
  const showLoader =
    pageLoading || (authChecking && shouldShowRouteLoader(location.pathname));

  useLayoutEffect(() => {
    if (shouldShowRouteLoader(location.pathname)) {
      dispatch(setPageLoading(true));
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (!shouldShowRouteLoader(location.pathname)) {
      dispatch(setPageLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      // ── Auth pages (login, password, signup, home):
      // No /me call needed. Just read localStorage and mark auth done.
      // Password.jsx now uses window.location.href so the dashboard
      // always loads fresh — localStorage is guaranteed to be populated
      // before this effect runs on the dashboard page.
      if (SKIP_LOADER_ROUTES.includes(location.pathname)) {
        const storedUser = (() => {
          try { return JSON.parse(window.localStorage.getItem("authUser") || "null"); }
          catch { return null; }
        })();
        if (storedUser) dispatch(setUser(storedUser));
        dispatch(setAuthChecking(false));
        return;
      }

      // ── Protected pages:
      // localStorage is the single source of truth.
      // If data is there, trust it immediately and show the page.
      // Then silently verify with the server in the background.
      const storedUser = (() => {
        try { return JSON.parse(window.localStorage.getItem("authUser") || "null"); }
        catch { return null; }
      })();
      const storedToken = window.localStorage.getItem("authToken");

      if (storedUser && storedToken) {
        // Trust local session — set user and unblock the UI immediately
        dispatch(setUser(storedUser));
        dispatch(setAuthChecking(false));

        // Background verification: only clear session on a real token expiry
        axios
          .get(`${USER_API_END_POINT}/me`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${storedToken}` },
            validateStatus: () => true,
          })
          .then((res) => {
            if (res.status === 200) {
              // Refresh user data silently
              dispatch(setUser(res.data.user));
            } else if (res.status === 401) {
              const msg = (res.data?.message || "").toLowerCase();
              if (msg.includes("expired")) {
                // Only log out if the same token is still in storage
                const currentToken = window.localStorage.getItem("authToken");
                if (currentToken === storedToken) {
                  dispatch(setUser(null));
                  handleSessionExpired(res.data.message);
                }
              }
              // Other 401s (Safari ITP cookie block, etc.) → keep session alive
            }
          })
          .catch(() => {
            // Network error / Render cold start → keep local session alive
          });

        return;
      }

      // ── No local session: user navigated directly to a protected URL
      // without being logged in. Ask the server.
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
          validateStatus: () => true,
        });
        if (res.status === 200) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(setUser(null));
          const msg = res.data?.message || "";
          if (msg.toLowerCase().includes("expired")) {
            await handleSessionExpired(msg);
          }
        }
      } catch {
        dispatch(setUser(null));
      } finally {
        dispatch(setAuthChecking(false));
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Route path="/" element={<HeroSection />} />
          <Route path="/admin/login" element={<LoginSection />} />
          <Route path="/admin/signup" element={<SignUpSection />} />
          <Route path="/admin/password" element={<PasswordSection />} />
          <Route path="/verify" element={<VerifyAccountSection />} />
          <Route path="/employee/login" element={<EmployeeLoginSection />} />
          <Route path="/employee/password" element={<EmployeePasswordSection />} />
          <Route path="/employee/signup" element={<EmployeeSignUpSection />} />

          {/* admin protected pages */}
          <Route path="/admin/dashboard" element={<ProtectedRoutes role="admin"><Dashboard /></ProtectedRoutes>} />
          <Route path="/admin/employees" element={<ProtectedRoutes role="admin"><Employees /></ProtectedRoutes>} />
          <Route path="/admin/leave" element={<ProtectedRoutes role="admin"><Leave /></ProtectedRoutes>} />
          <Route path="/admin/payslips" element={<ProtectedRoutes role="admin"><Payslips /></ProtectedRoutes>} />
          <Route path="/admin/payslip/print/:id" element={<ProtectedRoutes role="admin"><PrintPayslip /></ProtectedRoutes>} />
          <Route path="/admin/setting" element={<ProtectedRoutes role="admin"><Settings /></ProtectedRoutes>} />

          {/* employee protected pages */}
          <Route path="/employee/dashboard" element={<ProtectedRoutes role="employee"><Dashboard /></ProtectedRoutes>} />
          <Route path="/employee/leave" element={<ProtectedRoutes role="employee"><LeaveEmployee /></ProtectedRoutes>} />
          <Route path="/employee/attendance" element={<ProtectedRoutes role="employee"><Attendance /></ProtectedRoutes>} />
          <Route path="/employee/payslips" element={<ProtectedRoutes role="employee"><EmployeePayslip /></ProtectedRoutes>} />
          <Route path="/employee/payslip/:id" element={<ProtectedRoutes role="employee"><PrintPayslip /></ProtectedRoutes>} />
          <Route path="/employee/setting" element={<ProtectedRoutes role="employee"><Settings /></ProtectedRoutes>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
