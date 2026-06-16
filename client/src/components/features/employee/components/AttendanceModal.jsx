import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ATTENDANCE_API_END_POINT } from "../../../../utils/constantUrl";
import { useDispatch, useSelector } from "react-redux";
import { setAttendance } from "../../../../redux/attendanceSlice";

const AttendanceModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { attendance } = useSelector((store) => store.attendance);
  const [input, setInput] = useState({
    taskProject: "",
    attendanceDate: "",
    clockInTime: "00:00",
    workLocation: "",
    shiftTime: "",
    notes: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const promise = axios.post(
        `${ATTENDANCE_API_END_POINT}/attendanceData`,
        input,
        {
          withCredentials: true,
        },
      );
      toast.promise(promise, {
        pending: "Attendance marked.. ",
        success: "Attendance marked successfully",
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Attendance not marked";
          },
        },
      });

      const res = await promise;
      if (res.data.success) {
        dispatch(setAttendance([...attendance, res.data.attendance]));
        navigate("/employee/attendance");
      }
    } catch (error) {
      console.error(error);
    }
  };
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
            <form onSubmit={submitHandler}>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="taskProject" className="form-label">
                      Task or Project
                    </label>
                    <input
                      type="text"
                      name="taskProject"
                      onChange={changeHandler}
                      value={input.taskProject}
                      className="form-control"
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
                      value={locationOptions.find(
                        (option) => option.value == input.workLocation,
                      )}
                      onChange={(selectedOption) =>
                        setInput({
                          ...input,
                          workLocation: selectedOption.value,
                        })
                      }
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
                    <input
                      type="text"
                      name="shiftTime"
                      onChange={changeHandler}
                      value={input.shiftTime}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      Notes(Optional)
                    </label>
                    <textarea
                      className="form-control"
                      name="notes"
                      onChange={changeHandler}
                      value={input.notes}
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Start
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
