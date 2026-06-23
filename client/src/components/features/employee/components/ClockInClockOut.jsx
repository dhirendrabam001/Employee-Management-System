import { FaRegClock } from "react-icons/fa";
import { BsFillStopFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ATTENDANCE_API_END_POINT } from "../../../../utils/constantUrl";
import {
  formatElapsed,
  getActiveAttendance,
  getGreeting,
  refreshAttendanceList,
} from "../../../../utils/attendanceHelpers";

const ClockInClockOut = () => {
  const [timer, setTimer] = useState("00:00:00");
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { attendance } = useSelector((store) => store.attendance);
  const firstName = user?.fullName?.split(" ")[0] || "User";
  const intervalRef = useRef(null);

  const activeAttendance = getActiveAttendance(attendance);
  const isRunning = Boolean(activeAttendance?.isClockedIn);

  useEffect(() => {
    if (!activeAttendance?.clockInTime) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const start = new Date(activeAttendance.clockInTime).getTime();
    if (intervalRef.current) clearInterval(intervalRef.current);

    const tick = () => setTimer(formatElapsed(Date.now() - start));
    tick();
    intervalRef.current = setInterval(tick, 1000);

    return () => clearInterval(intervalRef.current);
  }, [activeAttendance]);

  const handleClockOut = async () => {
    if (!isRunning) {
      toast.info("No active timer to stop");
      return;
    }

    try {
      const promise = axios.post(
        `${ATTENDANCE_API_END_POINT}/clockOut`,
        {},
        { withCredentials: true },
      );

      toast.promise(promise, {
        pending: "Stopping timer...",
        success: "Timer stopped successfully",
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Failed to stop timer";
          },
        },
      });

      const res = await promise;
      if (res.data.success) {
        await refreshAttendanceList(dispatch);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="clock-panel-wrap">
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="clock-panel-card clock-panel-main h-100">
            <div className="clock-panel-header">
              <div>
                <h5 className="clock-panel-title">
                  {getGreeting()}, {firstName} 👋
                </h5>
                <p className="clock-panel-subtitle">
                  {isRunning
                    ? `Tracking: ${activeAttendance.taskProject}`
                    : "Have a productive day ahead."}
                </p>
              </div>
              <div className="clock-panel-icon">
                <FaRegClock />
              </div>
            </div>

            <div className="row g-3 clock-panel-stats">
              <div className="col-12 col-sm-6">
                <div className="clock-stat-box clock-stat-status">
                  <span
                    className={`clock-status-dot ${isRunning ? "" : "clock-status-dot--off"
                      }`}
                  ></span>
                  <div>
                    <small>Status</small>
                    <h6
                      className={
                        isRunning ? "clock-status-in" : "clock-status-out"
                      }
                    >
                      {isRunning ? "Clocked In" : "Not Clocked In"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="clock-stat-box clock-stat-timer">
                  <small>Working Time</small>
                  <h4>{isRunning ? timer : "00:00:00"}</h4>
                  <span className="clock-timer-label">hrs : min : sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="clock-panel-card clock-panel-action h-100">
            <h6 className="clock-action-title">Today&apos;s Action</h6>

            {isRunning ? (
              <>
                <button
                  type="button"
                  onClick={handleClockOut}
                  className="clock-out-btn"
                >
                  <BsFillStopFill />
                  Stop Timer
                </button>
                <p className="clock-started-at">
                  <span className="clock-status-dot"></span>
                  Started at{" "}
                  {new Date(activeAttendance.clockInTime).toLocaleTimeString(
                    "en-IN",
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </p>
              </>
            ) : (
              <p className="clock-not-started">
                Click <strong>Clock In</strong> or use{" "}
                <strong>Start Timer</strong> in the table below to begin.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockInClockOut;
