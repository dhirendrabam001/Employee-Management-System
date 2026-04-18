import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import HeroSection from "./features/home/pages/HeroSection";
import { Route, Routes } from "react-router-dom";
import LoginSection from "./components/auth/pages/LoginSection";

function App() {
  return (
    <div className="full-layout">
      <Routes>
        <Route path="/" element={<HeroSection />}></Route>
        <Route path="/admin/portal" element={<LoginSection />}></Route>
      </Routes>
    </div>
  );
}
export default App;
