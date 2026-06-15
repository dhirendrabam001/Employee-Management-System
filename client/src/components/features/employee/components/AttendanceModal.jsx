import { useState } from "react";
import Select from "react-select";

const AttendanceModal = () => {
  const [location, setLocation] = useState(null);

  const locationOptions = [
    { value: "office", label: "Office" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "client-site", label: "Client Site" },
  ];

  return (
    <div
      className="modal fade"
      id="attendanceModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Attendance Timer
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <div className="mb-3">
                  <label htmlFor="employeeId" className="form-label">
                    Employee ID
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="mb-3">
                  <label htmlFor="attendanceDate" className="form-label">
                    Date
                  </label>
                  <input type="date" className="form-control" />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="mb-3">
                  <label htmlFor="clockInTime" className="form-label">
                    Clock In Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    defaultValue="00:00"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="mb-3">
                  <label htmlFor="workLocation" className="form-label">
                    Work Location
                  </label>
                  <Select
                    inputId="workLocation"
                    options={locationOptions}
                    value={location}
                    onChange={setLocation}
                    placeholder="Select location"
                    classNamePrefix="react-select"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        minHeight: "44px",
                        borderRadius: "0.375rem",
                        borderColor: "#ced4da",
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="mb-3">
                  <label htmlFor="shiftTime" className="form-label">
                    Shift Time
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="mb-3">
                  <label htmlFor="taskProject" className="form-label">
                    Task or Project
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Notes(Optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
