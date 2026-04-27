import { FaArrowRightLong } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { showPromise, showSuccess } from "../../../utils/toast";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constantUrl";
import { setEmail } from "../../../redux/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const promise = axios.post(`${USER_API_END_POINT}/checkEmail`, input, {
        withCredentials: true,
      });

      // loading success error
      toast.promise(promise, {
        pending: "Checking email...",
        success: "Email verified",
        error: "Email not found",
      });

      const res = await promise;
      if (res.data.success) {
        dispatch(setEmail(input.email));
        navigate("/admin/password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-main">
      <div className="card">
        <h2 className="text-center mb-2">
          Welcome <span>Back 👋</span>
        </h2>
        <p className="text-center text-muted">Sign in to your account</p>

        <form onSubmit={submitHandler}>
          <div className="mb-3 position-relative">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeHandler}
              className="form-control ps-5"
              placeholder="admin@example.com"
            />
            <CgMail className="form-icon" />
          </div>
          <div className="login-btn">
            <button type="submit" className="btn btn-primary w-100">
              Continue
            </button>
          </div>
        </form>
        <p className="text-center mt-3 text-muted">
          Don’t have an account?
          <Link className="ms-2" to="/admin/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
