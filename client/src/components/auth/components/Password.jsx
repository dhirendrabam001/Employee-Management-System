import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constantUrl";
import { toast } from "react-toastify";
import { setUser, getStoredToken } from "../../../redux/authSlice";

const Password = () => {
  const { email } = useSelector((store) => store.auth);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({ password: "" });
  // ── DEBUG: visible on-screen log for iPhone testing
  const [debugLog, setDebugLog] = useState([]);
  const log = (msg) => {
    console.log("[DEBUG]", msg);
    setDebugLog((prev) => [...prev, msg]);
  };

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setDebugLog([]);
    log(`email from Redux: "${email}"`);
    log(`API: ${USER_API_END_POINT}`);

    try {
      log("Sending login POST...");
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        { email, password: input.password, role: "admin" },
        { withCredentials: true },
      );
      log(`Response status: ${res.status}`);
      log(`success: ${res.data.success}`);
      log(`user role: ${res.data.user?.role}`);
      log(`token present: ${!!res.data.token}`);

      if (res.data.success) {
        const user = res.data.user;
        dispatch(setUser({ user, token: res.data.token }));
        log(`memoryToken after dispatch: ${!!getStoredToken()}`);
        log(`Navigating to: /${user?.role}/dashboard`);

        toast.success("Login Successfully");

        if (user?.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/employee/dashboard", { replace: true });
        }
      } else {
        log(`Login failed: ${res.data.message}`);
      }
    } catch (error) {
      log(`ERROR: ${error?.response?.data?.message || error.message}`);
      toast.error(error?.response?.data?.message || "Invalid credentials ❌");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center password-card">
      <div className="card shadow">
        <div className="heading">
          <h2 className="text-center mb-2">
            Welcome <span>Back 👋</span>
          </h2>
          <p className="text-center text-muted">Sign in to your account</p>
        </div>
        <div className="d-flex align-items-center justify-content-between py-4">
          <div className="password-heading">
            <h6>{email || <span style={{color:"red"}}>[email is empty!]</span>}</h6>
          </div>
          <div className="password-edit">
            <Link className="edit">Edit</Link>
          </div>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control ps-5"
              onChange={changeHandler}
              name="password"
              value={input.password}
              placeholder="Enter your password"
            />
            <TbLockPassword className="form-icon" />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3 eyes"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="login-btn py-2">
            <button type="submit" className="btn btn-primary w-100">
              Sign in
            </button>
          </div>
          <div className="form-check mb-3 d-flex align-items-center justify-content-between mt-2">
            <div className="password-input">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <div>
              <Link>Forget Password?</Link>
            </div>
          </div>
        </form>

        {/* ── DEBUG PANEL — visible on iPhone screen ── */}
        {debugLog.length > 0 && (
          <div style={{
            marginTop: 12,
            background: "#000",
            color: "#0f0",
            fontSize: 11,
            padding: 8,
            borderRadius: 6,
            fontFamily: "monospace",
            maxHeight: 200,
            overflowY: "auto",
            wordBreak: "break-all",
          }}>
            {debugLog.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Password;
