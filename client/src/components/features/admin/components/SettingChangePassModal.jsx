import axios from "axios";
import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { USER_API_END_POINT } from "../../../../utils/constantUrl";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../redux/authSlice";
const SettingChangePassModal = () => {
  const dispatch = useDispatch();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [input, setInput] = useState({
    currentPass: "",
    newPass: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const promise = axios.put(`${USER_API_END_POINT}/changePass`, input, {
        withCredentials: true,
      });

      toast.promise(promise, {
        pending: "Changing...",
        success: "Password change successfully",
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Password is not changes";
          },
        },
      });

      const res = await promise;
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setInput({
          currentPass: "",
          newPass: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="changebtn"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <div className="d-flex align-items-center">
              <div className="modal-icon">
                <FaLock />
              </div>
              <div className="modal-title">
                <h5>Change Password</h5>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={submitHandler} className="password-setting">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">
                      Current Password
                    </label>
                    <input
                      type={showCurrent ? "text" : "password"}
                      name="currentPass"
                      value={input.currentPass}
                      onChange={changeHandler}
                      className="form-control"
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                      onClick={() => setShowCurrent(!showCurrent)}
                    >
                      {showCurrent ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">
                      New Password
                    </label>
                    <input
                      type={showNew ? "text" : "password"}
                      name="newPass"
                      value={input.newPass}
                      onChange={changeHandler}
                      className="form-control"
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                      onClick={() => setShowNew(!showNew)}
                    >
                      {showNew ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingChangePassModal;
