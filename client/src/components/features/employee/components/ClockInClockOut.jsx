import { FaRegClock } from "react-icons/fa";
import { BsFillStopFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ATTENDANCE_API_END_POINT } from "../../../../utils/constantUrl";
import { setAttendance } from "../../../../redux/attendanceSlice";

const ClockInClockOut = () => {
  const [timer, setTimer] = useState("00:00:00");
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { attendance } = useSelector((store) => store.attendance);
  const firstName = user?.fullName?.split(" ")[0] || "User";

  const intervalRef = useRef(null);

  // find today's active attendance (clocked in) or latest today's record
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const todaysAttendance = Array.isArray(attendance)
    ? attendance.find((item) => {
        const ad = new Date(item.attendanceDate);
        return ad >= startOfDay && ad <= endOfDay;
      })
    : null;

  const activeAttendance =
    todaysAttendance && todaysAttendance.isClockedIn
      ? todaysAttendance
      : attendance && Array.isArray(attendance)
        ? attendance.find((a) => a.isClockedIn === true)
        : null;

  const formatElapsed = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0",
    );
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  useEffect(() => {
    // start live timer when there is an active clock-in
    if (activeAttendance && activeAttendance.clockInTime) {
      const start = new Date(activeAttendance.clockInTime).getTime();
      // clear existing
      if (intervalRef.current) clearInterval(intervalRef.current);
      // update immediately
      setTimer(formatElapsed(Date.now() - start));
      intervalRef.current = setInterval(() => {
        setTimer(formatElapsed(Date.now() - start));
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }

    // no active attendance -> reset
    setTimer("00:00:00");
    if (intervalRef.current) clearInterval(intervalRef.current);
    return () => {};
  }, [activeAttendance]);

  const handleClockOut = async () => {
    try {
      const res = await axios.post(
        `${ATTENDANCE_API_END_POINT}/clockOut`,
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        // refresh all attendance list
        const all = await axios.get(
          `${ATTENDANCE_API_END_POINT}/getAllAttendance`,
          {
            withCredentials: true,
          },
        );
        if (all.data.success) dispatch(setAttendance(all.data.attendance));
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
                  Good Morning, {firstName} 👋
                </h5>
                <p className="clock-panel-subtitle">
                  Have a productive day ahead.
                </p>
              </div>
              <div className="clock-panel-icon">
                <FaRegClock />
              </div>
            </div>

            <div className="row g-3 clock-panel-stats">
              <div className="col-12 col-sm-6">
                <div className="clock-stat-box clock-stat-status">
                  <span className="clock-status-dot"></span>
                  <div>
                    <small>Status</small>
                    <h6>
                      {activeAttendance && activeAttendance.isClockedIn
                        ? "Clocked In"
                        : "Not Clocked In"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="clock-stat-box clock-stat-timer">
                  <small>Working Time</small>
                  <h4>
                    {activeAttendance && activeAttendance.isClockedIn
                      ? timer
                      : "00:00:00"}
                  </h4>
                  <span className="clock-timer-label">hrs : min : sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="clock-panel-card clock-panel-action h-100">
            <h6 className="clock-action-title">Today&apos;s Action</h6>

            {activeAttendance && activeAttendance.isClockedIn ? (
              <button
                type="button"
                onClick={handleClockOut}
                className="clock-out-btn"
              >
                <BsFillStopFill />
                Clock Out
              </button>
            ) : (
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#attendanceModal"
                className="btn btn-primary"
              >
                <BsFillStopFill />
                Clock In
              </button>
            )}

            <p className="clock-started-at">
              <span className="clock-status-dot"></span>
              {activeAttendance && activeAttendance.clockInTime ? (
                <>
                  Started at{" "}
                  {new Date(activeAttendance.clockInTime).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </>
              ) : (
                <>No active session</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockInClockOut;
