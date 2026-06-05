import { CiUser } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import SettingChangePass from "./SettingChangePassModal";
const SettingDetails = () => {
  return (
    <>
      {" "}
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
            <form className="setting-form">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Email
                    </label>
                    <input type="email" className="form-control" />
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
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                    <p>This will be displayed on your profile.</p>
                  </div>
                </div>
                <div className="setting-btn">
                  <button className="employee-add-btn d-flex align-items-center gap-2 setting-btn">
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
