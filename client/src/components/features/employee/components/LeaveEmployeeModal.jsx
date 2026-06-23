import axios from "axios";
import { useState } from "react";
import Select from "react-select";
import { LEAVE_API_END_POINT } from "../../../../utils/constantUrl";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setLeave } from "../../../../redux/leaveSlice";

const LeaveEmployeeModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const changeHandler = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const promise = axios.post(`${LEAVE_API_END_POINT}/applyLeave`, input, {
        withCredentials: true,
      });
      toast.promise(promise, {
        pending: "Submit leave request...",
        success: "Leave applied successfully",
        error: {
          render({ data }) {
            return (
              data?.response?.data?.message || "Something wrong leave applied"
            );
          },
        },
      });

      const res = await promise;
      if (res.data.success) {
        dispatch(setLeave(res.data.leave));

        // Close bootstrap modal if present
        const modalEl = document.getElementById("leaveEmployeeModal");
        try {
          const bs = window.bootstrap;
          if (bs && modalEl) {
            const instance =
              bs.Modal.getInstance(modalEl) || new bs.Modal(modalEl);
            instance.hide();
          }
        } catch (err) {
          // ignore if bootstrap not available
        }

        // After a short delay navigate to /employee/leave (or reload if already there)
        setTimeout(() => {
          if (location?.pathname === "/employee/leave") {
            window.location.reload();
          } else {
            navigate("/employee/leave");
          }
        }, 300);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              <form onSubmit={submitHandler}>
                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="workLocation" className="form-label">
                      Leave Type
                    </label>
                    <Select
                      name="leaveType"
                      value={LeaveReason.find(
                        (option) => option.value == input.leaveType,
                      )}
                      onChange={(selectedLeave) =>
                        setInput({
                          ...input,
                          leaveType: selectedLeave.value,
                        })
                      }
                      options={LeaveReason}
                      classNamePrefix="react-select"
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
                      <input
                        type="date"
                        name="startDate"
                        value={input.startDate}
                        onChange={changeHandler}
                        className="form-control"
                      />
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
                      <input
                        type="date"
                        name="endDate"
                        value={input.endDate}
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
                        Reason
                      </label>
                      <textarea
                        name="reason"
                        value={input.reason}
                        onChange={changeHandler}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Briefly describe why you need this leave..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary w-100">
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
