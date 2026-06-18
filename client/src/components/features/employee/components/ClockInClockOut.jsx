import { FaRegClock } from "react-icons/fa";
import { BsFillStopFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState } from "react";

const ClockInClockOut = () => {
  const [timer, setTimer] = useState("00:00:00");
  const { user } = useSelector((store) => store.auth);
  const { attendance } = useSelector((store) => store.attendance);
  const firstName = user?.fullName?.split(" ")[0] || "User";

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
                    <h6>Clocked In</h6>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="clock-stat-box clock-stat-timer">
                  <small>Working Time</small>
                  <h4>02:45:32</h4>
                  <span className="clock-timer-label">hrs : min : sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="clock-panel-card clock-panel-action h-100">
            <h6 className="clock-action-title">Today&apos;s Action</h6>

            <button type="button" className="clock-out-btn">
              <BsFillStopFill />
              Clock Out
            </button>

            <p className="clock-started-at">
              <span className="clock-status-dot"></span>
              Started at 09:15 AM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockInClockOut;
