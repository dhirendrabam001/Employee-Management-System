import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import HeroSection from "./features/home/pages/HeroSection";
import { Route, Routes } from "react-router-dom";
import LoginSection from "./components/auth/pages/LoginSection";
import SignUpSection from "./components/auth/pages/SignUpSection";
import PasswordSection from "./components/auth/pages/PasswordSection";

function App() {
  return (
    <div className="full-layout">
      <Routes>
        <Route path="/" element={<HeroSection />}></Route>
        <Route path="/admin/portal" element={<LoginSection />}></Route>
        <Route path="/admin/signup" element={<SignUpSection />}></Route>
        <Route path="/admin/password" element={<PasswordSection />}></Route>
      </Routes>
    </div>
  );
}
export default App;
