import { useState } from "react";
import Select from "react-select";

const LeaveEmployeeModal = () => {
  const [leaveData, setLeaveData] = useState(null);
  const LeaveReason = [
    { value: "sick", label: "Sick Leave" },
    { value: "casual", label: "Casual Leave" },
    { value: "annual", label: "Annual Leave" },
    { value: "workhome", label: "Work from home" },
  ];

  return (
    <div className="leaveModal">
      <div className="modal fade" id="leaveEmployeeModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Apply for Leave
              </h1>
              <p>Submit your leave request for approva</p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="workLocation" className="form-label">
                      Leave Type
                    </label>
                    <Select
                      inputId="workLocation"
                      options={LeaveReason}
                      classNamePrefix="react-select"
                      //   value={locationOptions.find(
                      //     (option) => option.value === input.workLocation,
                      //   )}
                      //   onChange={(selectedOption) =>
                      //     setInput({
                      //       ...input,
                      //       workLocation: selectedOption?.value || "",
                      //     })
                      //   }
                      placeholder="Select location"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        From
                      </label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        To
                      </label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                      >
                        Reason
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Briefly describe why you need this leave..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary w-100">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveEmployeeModal;
