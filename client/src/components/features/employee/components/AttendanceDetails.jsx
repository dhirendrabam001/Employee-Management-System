import { FaCalendarCheck, FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaFileAlt, FaClipboardList } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import AttendanceModal from "./AttendanceModal";
import useGetAllAttendance from "../../../../hooks/useGetAllAttendance";
import { useDispatch, useSelector } from "react-redux";
import ClockInClockOut from "./ClockInClockOut";
import axios from "axios";
import { toast } from "react-toastify";
import { ATTENDANCE_API_END_POINT } from "../../../../utils/constantUrl";
import {
  formatClockTime,
  formatWorkingHrs,
  getActiveAttendance,
  refreshAttendanceList,
} from "../../../../utils/attendanceHelpers";

const formatToday = () =>
  new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const getStatusClass = (status = "") => {
  const value = status.toLowerCase();
  if (value.includes("late")) return "late";
  if (value.includes("absent")) return "absent";
  return "present";
};

const statsConfig = [
  {
    key: "present",
    label: "Days Present",
    hint: "This month",
    icon: <FaCalendarCheck />,
    accent: "attendance-stat-indigo",
  },
  {
    key: "leaves",
    label: "Pending Leaves",
    hint: "Awaiting approval",
    icon: <FaFileAlt />,
    accent: "attendance-stat-amber",
  },
  {
    key: "payslips",
    label: "Latest Payslips",
    hint: "Generated records",
    icon: <HiCurrencyDollar />,
    accent: "attendance-stat-emerald",
  },
];

const AttendanceDetails = () => {
  useGetAllAttendance();
  const dispatch = useDispatch();
  const { attendance } = useSelector((store) => store.attendance);
  const activeAttendance = getActiveAttendance(attendance);

  const daysPresent = attendance.filter((item) =>
    item.status?.toLowerCase().includes("present"),
  ).length;

  const statValues = {
    present: daysPresent || attendance.length,
    leaves: 15,
    payslips: 10,
  };

  const handleStartTimer = async (id) => {
    try {
      const promise = axios.post(
        `${ATTENDANCE_API_END_POINT}/startTimer/${id}`,
        {},
        { withCredentials: true },
      );

      toast.promise(promise, {
        pending: "Starting timer...",
        success: "Timer started",
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Failed to start timer";
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

  const handleStopTimer = async () => {
    try {
      const promise = axios.post(
        `${ATTENDANCE_API_END_POINT}/clockOut`,
        {},
        { withCredentials: true },
      );

      toast.promise(promise, {
        pending: "Stopping timer...",
        success: "Timer stopped",
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

  const getWorkingHrsDisplay = (item) => {
    if (item.isClockedIn && item._id === activeAttendance?._id) {
      return "Running...";
    }
    return formatWorkingHrs(item.totalWorkingHrs);
  };

  return (
    <>
      <section className="admin-card attendance-card attendance-page">
        <div className="container">
          <div className="attendance-header-pro">
            <div className="header-left-pro">
              <span className="attendance-page-eyebrow">Employee Portal</span>
              <h2>Attendance</h2>
              <p>Track your work hours and daily check-ins</p>
            </div>
            <div className="attendance-header-meta">
              <div className="latest-date-pro">
                <MdOutlineDateRange />
                <span>{formatToday()}</span>
              </div>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#attendanceModal"
                className="btn-clock-in-pro"
                disabled={Boolean(activeAttendance)}
              >
                <FaArrowRightLong />
                <span>Clock In</span>
              </button>
            </div>
          </div>

          <ClockInClockOut />

          <div className="attendance-stats-grid row g-4">
            {statsConfig.map((stat) => (
              <div key={stat.key} className="col-12 col-md-6 col-lg-4">
                <div
                  className={`attendance-stat-card ${stat.accent} d-flex align-items-center justify-content-between`}
                >
                  <div>
                    <p className="attendance-stat-label">{stat.label}</p>
                    <h3 className="attendance-stat-value">
                      {statValues[stat.key]}
                    </h3>
                    <span className="attendance-stat-hint">{stat.hint}</span>
                  </div>
                  <div className="attendance-stat-icon">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="attendance-activity-card">
            <div className="attendance-activity-head">
              <div>
                <h5>Recent Activity</h5>
                <p>A quick view of your latest check-ins and work hours.</p>
              </div>
              <div className="attendance-avg-badge">
                <span>Avg. Work Hrs</span>
                <strong>8.5</strong>
              </div>
            </div>

            <div className="attendance-table-wrap">
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0 attendance-table-pro">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Project</th>
                      <th>Clock In</th>
                      <th>Shift</th>
                      <th>Location</th>
                      <th>Working Hrs</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.length === 0 ? (
                      <tr className="attendance-empty-row">
                        <td colSpan="8" className="attendance-empty-cell">
                          <div className="attendance-empty-state">
                            <div className="attendance-empty-icon">
                              <FaClipboardList />
                            </div>
                            <h6>No attendance records yet</h6>
                            <p>
                              Click <strong>Clock In</strong> to start tracking
                              your work day.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      attendance.map((item) => {
                        const formattedDate = new Date(
                          item.attendanceDate,
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });
                        const isActive = item.isClockedIn === true;

                        return (
                          <tr
                            key={item._id}
                            className={isActive ? "attendance-row-active" : ""}
                          >
                            <td data-label="Date">{formattedDate}</td>
                            <td data-label="Project">
                              <div className="project-cell">
                                <div className="project-title">
                                  {item.taskProject}
                                </div>
                                <div className="project-actions">
                                  {isActive ? (
                                    <button
                                      type="button"
                                      className="btn-timer btn-timer-stop"
                                      onClick={handleStopTimer}
                                    >
                                      Stop Timer
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="btn-timer"
                                      onClick={() => handleStartTimer(item._id)}
                                      disabled={Boolean(activeAttendance)}
                                    >
                                      Start Timer
                                    </button>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td data-label="Clock In">
                              {formatClockTime(item.clockInTime)}
                            </td>
                            <td data-label="Shift">{item.shiftTime}</td>
                            <td data-label="Location">{item.workLocation}</td>
                            <td data-label="Working Hrs">
                              {getWorkingHrsDisplay(item)}
                            </td>
                            <td data-label="Status">
                              <span
                                className={`status-pill ${getStatusClass(item.status)}`}
                              >
                                {isActive ? "Active" : item.status}
                              </span>
                            </td>
                            <td data-label="Notes">{item.notes || "—"}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AttendanceModal />
    </>
  );
};

export default AttendanceDetails;
