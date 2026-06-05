import { FaLock } from "react-icons/fa6";
const SettingChangePassModal = () => {
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
            <form>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Current Password
                    </label>
                    <input type="password" className="form-control" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      New Password
                    </label>
                    <input type="password" className="form-control" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingChangePassModal;
