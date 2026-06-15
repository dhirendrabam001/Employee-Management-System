import { FaCalendarCheck, FaArrowRightLong } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import AttendanceModal from "./AttendanceModal";
const AttendanceDetails = () => {
  return (
    <>
      <section className="admin-card attendance-card">
        <div className="container">
          <div className="attendance-header d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mb-4">
            <div>
              <h2>Attendance</h2>
              <p>Track your work hours and daily check-ins</p>
            </div>
            <div className="attendance-clock-btn">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#attendanceModal"
                className="btn btn-clock-in d-flex align-items-center gap-3"
              >
                <span className="btn-clock-icon">
                  <FaArrowRightLong />
                </span>
                <span className="btn-clock-copy">
                  <span className="btn-clock-title">Clock In</span>
                  <span className="btn-clock-subtitle">
                    start your work day
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="summary-card d-flex align-items-center justify-content-between">
                <div>
                  <h6>Days Present</h6>
                  <h2>10</h2>
                </div>
                <div className="summary-icon">
                  <FaCalendarCheck />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="summary-card d-flex align-items-center justify-content-between">
                <div>
                  <h6>Pending Leaves</h6>
                  <h2>15</h2>
                </div>
                <div className="summary-icon">
                  <FaFileAlt />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="summary-card d-flex align-items-center justify-content-between">
                <div>
                  <h6>Latest Payslips</h6>
                  <h2>10</h2>
                </div>
                <div className="summary-icon">
                  <HiCurrencyDollar />
                </div>
              </div>
            </div>
          </div>

          <div className="attendance-table-card mt-4 p-4">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
              <div>
                <h5 className="mb-1">Recent Activity</h5>
                <p className="mb-0 text-muted">
                  A quick view of your latest check-ins and work hours.
                </p>
              </div>
              <div className="badge bg-light text-dark py-2 px-3">
                Avg. Work Hrs 8.5
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-borderless align-middle mb-0">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Working Hours</th>
                    <th>Day Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Jun 10, 2026</td>
                    <td>09:00 AM</td>
                    <td>05:45 PM</td>
                    <td>8h 45m</td>
                    <td>Full Day</td>
                    <td>
                      <span className="status-pill present">Present</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Jun 09, 2026</td>
                    <td>09:15 AM</td>
                    <td>05:30 PM</td>
                    <td>8h 15m</td>
                    <td>Full Day</td>
                    <td>
                      <span className="status-pill late">Late</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Jun 08, 2026</td>
                    <td>09:00 AM</td>
                    <td>05:40 PM</td>
                    <td>8h 40m</td>
                    <td>Full Day</td>
                    <td>
                      <span className="status-pill present">Present</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Jun 07, 2026</td>
                    <td>--</td>
                    <td>--</td>
                    <td>0h 00m</td>
                    <td>Absent</td>
                    <td>
                      <span className="status-pill absent">Absent</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <AttendanceModal />
    </>
  );
};

export default AttendanceDetails;
