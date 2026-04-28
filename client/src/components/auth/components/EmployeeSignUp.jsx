import { FaArrowRightLong, FaRegUser } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { IoCallOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { showPromise } from "../../../utils/toast";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constantUrl";

const EmployeeSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "employee",
  });

  const changeHander = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await showPromise(
        axios.post(`${USER_API_END_POINT}/register`, input, {
          withCredentials: true,
        }),
        {
          pending: "Account Creating...",
          success: "Account Create Successfully!",
          error: "Faile to create account",
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center login-main mt-3">
      <div className="card">
        <h2 className="mb-2 fs-2">
          Create An Employee <span>Account!</span>
        </h2>
        <p className="text-muted">Fill in the details to get started</p>

        <form onSubmit={submitHandler}>
          <div className="mb-3 position-relative">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={changeHander}
              className="form-control ps-5"
              placeholder="Enter Your Full Name"
            />
            <FaRegUser className="form-icon fs-6" />
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeHander}
              className="form-control ps-5"
              placeholder="employee@example.com"
            />
            <CgMail className="form-icon" />
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control ps-5"
              name="password"
              value={input.password}
              onChange={changeHander}
              placeholder="Create a password"
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

          <div className="mb-3 position-relative">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeHander}
              className="form-control ps-5"
              placeholder="Enter your phone number"
            />
            <IoCallOutline className="form-icon" />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              required
            />
            <label className="form-check-label" htmlFor="remember">
              I agree to the <span>Terms & Condition</span> and
              <span className="ms-2">Privacy Policy</span>
            </label>
          </div>

          <div className="login-btn">
            <button type="submit" className="btn btn-primary w-100">
              <FiUserPlus className="mb-1 me-3 fs-5" />
              Create An Employee Account
            </button>
          </div>
        </form>
        <p className="text-center mt-3 text-muted">
          Already have an account?
          <Link className="ms-2" to="/employee/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmployeeSignUp;
