import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Select from "react-select";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import useGetEmployee from "../../../../hooks/useGetEmployee";
import useGetAllEmployeeLeave from "../../../../hooks/useGetAllEmployeeLeave";

const LeaveDetails = () => {
  useGetAllEmployeeLeave();
  const { leave } = useSelector((store) => store.leave);
  leave.map((item) => {
    const firstName = item.user?.firstName;
    const lastName = item.user?.lastName;

    console.log(firstName); // ✅ Dhirendra
  });
  const statusOptions = [
    { value: "1", label: "All Status" },
    { value: "2", label: "Pending" },
    { value: "3", label: "Approved" },
    { value: "4", label: "Rejected" },
  ];

  const leaveData = [
    {
      id: 1,
      name: "Mark",
      role: "UI Designer",
      avatar: "M",
      leaveType: "Casual Leave",
      leaveBadge: "blue",
      dates: "12 Apr - 14 Apr 2025",
      reason: "Personal",
      status: "Pending",
    },
    {
      id: 2,
      name: "Sophia",
      role: "Marketing Manager",
      avatar: "S",
      leaveType: "Sick Leave",
      leaveBadge: "green",
      dates: "18 Apr - 19 Apr 2025",
      reason: "Fever and rest",
      status: "Approved",
    },
    {
      id: 3,
      name: "James",
      role: "Developer",
      avatar: "J",
      leaveType: "Annual Leave",
      leaveBadge: "purple",
      dates: "25 Apr - 30 Apr 2025",
      reason: "Vacation",
      status: "Pending",
    },
  ];

  const statusBadge = (status) => {
    if (status === "Approved") return "approved";
    if (status === "Rejected") return "rejected";
    return "pending";
  };

  return (
    <section className="leave-panel">
      <div className="container">
        <div className="leave-top">
          <div className="leave-title">
            <div className="icon-box">📅</div>
            <div>
              <h2>Leave Management</h2>
              <p>Review and manage employee leave requests</p>
            </div>
          </div>

          <div className="leave-top-actions">
            <button type="button" className="leave-action-btn">
              <FaPlus /> New Request
            </button>
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

        <div className="leave-filters">
          <div className="row align-items-center g-4 employee-search">
            <div className="col-12 col-md-10 col-lg-10">
              <div className="employee-search-input">
                <CiSearch className="search-icon" />
                <input type="text" placeholder="Search employees, roles..." />
              </div>
            </div>
            <div className="col-12 col-md-2 col-lg-2">
              <div className="select-search">
                <Select
                  options={statusOptions}
                  classNamePrefix="select-custom"
                  placeholder="All Status"
                  menuPlacement="top"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="leave-table-wrapper table-responsive">
          <table className="table table-borderless leave-table">
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>LEAVE TYPE</th>
                <th>DATES</th>
                <th>REASON</th>
                <th>STATUS</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {leave.length === 0 ? (
                <tr>
                  <td colSpan="6" className="leave-content py-4 text-center">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                leave.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="emp">
                        <div className={`avatar avatar-${item.leaveBadge}`}>
                          {item.user?.firstName?.charAt(0)}
                        </div>
                        <div>
                          <h4>{item.name}</h4>
                          <span>{item.role}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${item.leaveBadge}`}>
                        {item.leaveType}
                      </span>
                    </td>
                    <td>
                      <p>{item.dates}</p>
                    </td>
                    <td>{item.reason}</td>
                    <td>
                      <span className={`status ${statusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button className="approve">Approve</button>
                      <button className="reject">Reject</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default LeaveDetails;
