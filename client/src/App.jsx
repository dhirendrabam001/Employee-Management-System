import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./Responsive.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

import HeroSection from "./features/home/pages/HeroSection";
import { Route, Routes } from "react-router-dom";
import LoginSection from "./components/auth/pages/LoginSection";
import SignUpSection from "./components/auth/pages/SignUpSection";
import PasswordSection from "./components/auth/pages/PasswordSection";
import VerifyAccountSection from "./components/auth/pages/VerifyAccountSection";
import EmployeeLoginSection from "./components/auth/pages/EmployeeLoginSection";
import EmployeePasswordSection from "./components/auth/pages/EmployeePasswordSection";
import EmployeeSignUpSection from "./components/auth/pages/EmployeeSignUpSection";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminDashboard from "./components/features/admin/pages/AdminDashboard";
import EmployeeDashboard from "./components/features/employee/pages/EmployeeDashboard";
import { useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "./utils/constantUrl";
import { setUser } from "./redux/authSlice";
import { showError } from "./utils/toast";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });

        dispatch(setUser(res.data.user));
      } catch (error) {
        console.error(error);
        dispatch(setUser(null));
        if (error.response?.status === 401) {
          showError("Session expired, please login again!");
        }
      }
    };
    fetchUser();
  }, []);

  return (
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
              <AdminDashboard />
            </ProtectedRoutes>
          }
        ></Route>
        <Route path="/admin/login" element={<LoginSection />}></Route>
        <Route path="/admin/signup" element={<SignUpSection />}></Route>
        <Route path="/admin/password" element={<PasswordSection />}></Route>
        <Route path="/verify" element={<VerifyAccountSection />}></Route>

        {/* employee routes */}
        <Route
          path="/employee/login"
          element={<EmployeeLoginSection />}
        ></Route>
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoutes role="employee">
              <EmployeeDashboard />
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
      </Routes>
    </div>
  );
}
export default App;
