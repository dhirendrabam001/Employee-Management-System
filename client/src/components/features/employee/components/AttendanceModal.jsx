import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { ATTENDANCE_API_END_POINT } from "../../../../utils/constantUrl";
import { useDispatch, useSelector } from "react-redux";
import { refreshAttendanceList } from "../../../../utils/attendanceHelpers";

const locationOptions = [
  { value: "office", label: "Office" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "client-site", label: "Client Site" },
];

const shiftOptions = [
  { value: "9:00 AM - 6:00 PM", label: "9:00 AM - 6:00 PM" },
  { value: "10:00 AM - 7:00 PM", label: "10:00 AM - 7:00 PM" },
  { value: "8:00 AM - 5:00 PM", label: "8:00 AM - 5:00 PM" },
];

const selectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "44px",
    borderRadius: "0.375rem",
    borderColor: "#ced4da",
  }),
};

const closeAttendanceModal = () => {
  const modalEl = document.getElementById("attendanceModal");
  if (!modalEl || !window.bootstrap) return;
  const instance =
    window.bootstrap.Modal.getInstance(modalEl) ||
    new window.bootstrap.Modal(modalEl);
  instance.hide();
};

const AttendanceModal = () => {
  const dispatch = useDispatch();
  const { attendance } = useSelector((store) => store.attendance);
  const [input, setInput] = useState({
    taskProject: "",
    workLocation: "",
    shiftTime: "",
    notes: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setInput({
      taskProject: "",
      workLocation: "",
      shiftTime: "",
      notes: "",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !input.taskProject.trim() ||
      !input.workLocation ||
      !input.shiftTime.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const promise = axios.post(
        `${ATTENDANCE_API_END_POINT}/attendanceData`,
        {
          taskProject: input.taskProject.trim(),
          workLocation: input.workLocation,
          shiftTime: input.shiftTime.trim(),
          notes: input.notes.trim(),
        },
        { withCredentials: true },
      );

      toast.promise(promise, {
        pending: "Clocking in...",
        success: "Clock in successful — timer started",
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Clock in failed";
          },
        },
      });

      const res = await promise;
      if (res.data.success) {
        await refreshAttendanceList(dispatch);
        resetForm();
        closeAttendanceModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hasActiveTimer = attendance.some((item) => item.isClockedIn);

  return (
    <div
      className="modal fade"
      id="attendanceModal"
      tabIndex="-1"
      aria-labelledby="attendanceModalLabel"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="attendanceModalLabel">
              Clock In
            </h1>
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
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="taskProject" className="form-label">
                      Task or Project <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="taskProject"
                      name="taskProject"
                      onChange={changeHandler}
                      value={input.taskProject}
                      className="form-control"
                      placeholder="e.g. Employee Management System"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="workLocation" className="form-label">
                      Work Location <span className="text-danger">*</span>
                    </label>
                    <Select
                      inputId="workLocation"
                      options={locationOptions}
                      value={locationOptions.find(
                        (option) => option.value === input.workLocation,
                      )}
                      onChange={(selectedOption) =>
                        setInput({
                          ...input,
                          workLocation: selectedOption?.value || "",
                        })
                      }
                      placeholder="Select location"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="shiftTime" className="form-label">
                      Shift Time <span className="text-danger">*</span>
                    </label>
                    <Select
                      inputId="shiftTime"
                      options={shiftOptions}
                      value={shiftOptions.find(
                        (option) => option.value === input.shiftTime,
                      )}
                      onChange={(selectedOption) =>
                        setInput({
                          ...input,
                          shiftTime: selectedOption?.value || "",
                        })
                      }
                      placeholder="Select shift"
                      classNamePrefix="react-select"
                      styles={selectStyles}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      Notes (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      name="notes"
                      id="notes"
                      onChange={changeHandler}
                      value={input.notes}
                      rows="3"
                      placeholder="Any additional notes..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer px-0 pb-0">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={hasActiveTimer}
                >
                  Start Clock In
                </button>
              </div>
              {hasActiveTimer && (
                <p className="text-muted small mt-2 mb-0">
                  A timer is already running. Stop it before starting a new
                  clock in.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
