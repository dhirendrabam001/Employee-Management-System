import { FaPlus } from "react-icons/fa";
import Select from "react-select";
import { CiSearch } from "react-icons/ci";
const LeaveDetails = () => {
  const status = [
    { value: "1", label: "All Status" },
    { value: "2", label: "Pending" },
    { value: "3", label: "Approved" },
    { value: "4", label: "Rejected" },
  ];

  const leaveData = [
    // {
    //   id: 1,
    //   name: "Mark",
    //   role: "UI Designer",
    //   avatar: "M",
    //   leaveType: "Casual Leave",
    //   leaveBadge: "blue",
    //   dates: "12 Apr - 14 Apr 2025",
    //   reason: "Personal",
    //   status: "Pending",
    // },
  ];

  return (
    <>
      {/* Header */}
      <section className="">
        <div className="container">
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
            <div className="row align-items-center g-4 employee-search">
              <div className="col-12 col-md-10 col-lg-10">
                <div className="employee-seach-input">
                  <input type="text" placeholder="Search Employees..." />
                  <CiSearch className="serach-icons" />
                </div>
              </div>
              <div className="col-12 col-md-2 col-lg-2">
                <div className="select-search">
                  <Select
                    options={status}
                    value={status}
                    placeholder="All Status"
                    classNamePrefix="select-custom"
                    menuPlacement="top"
                  ></Select>
                </div>
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
                {leaveData.length === 0 ? (
                  <div className="leave-content py-3">
                    <p className="text-center">No Application Found!</p>
                  </div>
                ) : (
                  leaveData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="emp">
                            <div className="avatar">{item.avatar}</div>
                            <div>
                              <h4>{item.name}</h4>
                              <span>{item.role}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className={`badge ${item.leaveBadge}`}>
                            {item.leaveType}
                          </span>
                        </td>

                        <td>
                          <p>{item.dates}</p>
                        </td>

                        <td>{item.reason}</td>

                        <td>
                          <span className="status pending">{item.status}</span>
                        </td>

                        <td className="actions">
                          <button className="approve">Approve</button>
                          <button className="reject">Reject</button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeaveDetails;
