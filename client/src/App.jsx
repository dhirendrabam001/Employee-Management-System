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
  const { authChecking, user } = useSelector((store) => store.auth);
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
      // ─── STEP 1: If the user is on an auth/public page right now,
      // we do NOT need to call /me at all. They are in the middle of
      // logging in (or are on the home page). Just read localStorage
      // and resolve authChecking immediately so nothing blocks them.
      //
      // This is the KEY fix for iPhone Safari ITP: on the /password
      // page, the old code fired GET /me with no cookie and no token
      // (because the user hadn't logged in yet), got a 401, and then
      // by the time it tried to re-check localStorage the race was
      // already lost on iOS, causing setUser(null) → redirect to /.
      const isAuthPage = SKIP_LOADER_ROUTES.includes(location.pathname);

      const readLocalStorage = () => {
        try {
          const u = JSON.parse(window.localStorage.getItem("authUser") || "null");
          const t = window.localStorage.getItem("authToken");
          return { user: u, token: t };
        } catch {
          return { user: null, token: null };
        }
      };

      if (isAuthPage) {
        // On auth pages: trust localStorage if it has a session, otherwise
        // just mark auth as done. Never call /me here.
        const { user: localUser } = readLocalStorage();
        if (localUser) {
          dispatch(setUser(localUser));
        }
        dispatch(setAuthChecking(false));
        return;
      }

      // ─── STEP 2: We are on a protected page. Try localStorage first.
      const { user: storedUser, token: storedToken } = readLocalStorage();

      if (storedUser && storedToken) {
        // Immediately trust the local session so the page renders now.
        dispatch(setUser(storedUser));
        dispatch(setAuthChecking(false));

        // Verify in the background with the Bearer token (cookie is
        // unreliable on iPhone). Only clear on a definitive "expired".
        axios
          .get(`${USER_API_END_POINT}/me`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${storedToken}` },
            validateStatus: () => true,
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch(setUser(res.data.user));
            } else if (res.status === 401) {
              const msg = (res.data?.message || "").toLowerCase();
              if (msg.includes("expired")) {
                // Confirm the same token is still in storage (not a new login)
                const currentToken = window.localStorage.getItem("authToken");
                if (currentToken === storedToken) {
                  dispatch(setUser(null));
                  handleSessionExpired(res.data.message);
                }
              }
              // Any other 401 (network glitch, ITP cookie block, etc.) → keep session
            }
          })
          .catch(() => {
            // Render cold-start / offline → keep local session alive
          });

        return;
      }

      // ─── STEP 3: No local session at all — must ask the server.
      // This only runs when a user lands directly on a protected URL
      // without any localStorage data (e.g. they cleared storage).
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
