import { CiUser } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import SettingChangePass from "./SettingChangePassModal";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../../../utils/constantUrl";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../redux/authSlice";
const SettingDetails = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    bio: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const promise = axios.put(`${USER_API_END_POINT}/updateSetting`, input, {
        withCredentials: true,
      });

      toast.promise(promise, {
        pending: "Updading...",
        success: "Profile updated successfully",
        error: {
          render({ data }) {
            return (
              data?.response?.data?.message ||
              "Something is wrong profile updated"
            );
          },
        },
      });

      const res = await promise;
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setInput({
          fullName: "",
          email: "",
          bio: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="setting-details">
        <div className="container">
          <h2>Settings Details</h2>
          <p>Manage your account and preferences</p>
          <div className="setting-main">
            <div className="setting-topbar d-flex align-items-center gap-2">
              <div className="setting-icon">
                <CiUser />
              </div>
              <div className="setting-heading">
                <h5>Public Profile</h5>
              </div>
            </div>
            <hr />
            <form onSubmit={submitHandler} className="setting-form">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={input.fullName}
                      onChange={changeHandler}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={input.email}
                      onChange={changeHandler}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Bio
                    </label>
                    <textarea
                      className="form-control"
                      name="bio"
                      value={input.bio}
                      onChange={changeHandler}
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                    <p>This will be displayed on your profile.</p>
                  </div>
                </div>
                <div className="setting-btn">
                  <button
                    type="submit"
                    className="employee-add-btn d-flex align-items-center gap-2 setting-btn"
                  >
                    <FaPlus />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>

            {/* password change */}
            <div className="password-change d-flex justify-content-between">
              <div className="setting-topbar d-flex align-items-center gap-2">
                <div className="setting-icon">
                  <FaLock />
                </div>
                <div className="setting-heading">
                  <h5>Public Profile</h5>
                </div>
              </div>
              <div className="change-btn">
                <button
                  className=""
                  data-bs-toggle="modal"
                  data-bs-target="#changebtn"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SettingChangePass />
    </>
  );
};

export default SettingDetails;
