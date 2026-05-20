import { FaPlus } from "react-icons/fa";

const LeaveDetails = () => {
  return (
    <>
      {/* Header */}
      <div className="leave-top">
        <div className="leave-title">
          <div className="icon-box">📅</div>
          <div>
            <h2>Leave Management</h2>
            <p>Review and manage employee leave requests</p>
          </div>
        </div>

        <div className="leave-stats">
          <div className="stat pending">
            <span>12</span>
            <p>Pending</p>
          </div>
          <div className="stat approved">
            <span>24</span>
            <p>Approved</p>
          </div>
          <div className="stat rejected">
            <span>03</span>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="leave-filters">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-6 col-lg-6">
            <input type="text" placeholder="Search by employee name..." />
          </div>
          <div className="col-12 col-md-3 col-lg-3">
            <select>
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="col-12 col-md-3 col-lg-3">
            <button className="btn-primary">
              <FaPlus /> New Leave Request
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="leave-table-wrapper">
        <table className="leave-table">
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>LEAVE TYPE</th>
              <th>DATES</th>
              <th>REASON</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div className="emp">
                  <div className="avatar">M</div>
                  <div>
                    <h4>Mark</h4>
                    <span>UI Designer</span>
                  </div>
                </div>
              </td>

              <td>
                <span className="badge blue">Casual Leave</span>
              </td>

              <td>
                <p>12 Apr – 14 Apr 2025</p>
              </td>

              <td>Personal</td>

              <td>
                <span className="status pending">Pending</span>
              </td>

              <td className="actions">
                <button className="approve">Approve</button>
                <button className="reject">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaveDetails;
