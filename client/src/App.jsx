import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import HeroSection from "./features/home/pages/HeroSection";
import { Route, Routes } from "react-router-dom";
import LoginSection from "./components/auth/pages/LoginSection";
import SignUpSection from "./components/auth/pages/SignUpSection";
import PasswordSection from "./components/auth/pages/PasswordSection";
import VerifyAccountSection from "./components/auth/pages/VerifyAccountSection";
import RedirectSection from "./components/auth/pages/RedirectSection";
import EmployeeLoginSection from "./components/auth/pages/EmployeeLoginSection";
import EmployeePasswordSection from "./components/auth/pages/EmployeePasswordSection";
import EmployeeSignUpSection from "./components/auth/pages/EmployeeSignUpSection";

function App() {
  return (
    <div className="full-layout">
      <Routes>
        <Route path="/" element={<HeroSection />}></Route>
        <Route path="/admin/login" element={<LoginSection />}></Route>
        <Route path="/admin/signup" element={<SignUpSection />}></Route>
        <Route path="/admin/password" element={<PasswordSection />}></Route>
        <Route path="/admin/verify" element={<VerifyAccountSection />}></Route>
        <Route path="/role/redirect" element={<RedirectSection />}></Route>
        {/* employee routes */}
        <Route
          path="/employee/login"
          element={<EmployeeLoginSection />}
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
