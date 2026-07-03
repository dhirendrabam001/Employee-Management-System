import { FaPlus } from "react-icons/fa";
import Select from "react-select";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import useGetEmployeeLeave from "../../../../hooks/useGetEmployeeLeave";
import axios from "axios";
import { LEAVE_API_END_POINT } from "../../../../utils/constantUrl";
import {
  setLeaveAllEmployee,
  setSearchLeaveText,
  setStatusFilter,
} from "../../../../redux/leaveSlice";
import { toast } from "react-toastify";

const LeaveDetails = () => {
  useGetEmployeeLeave();
  const { leaveAllEmployee, searchLeaveText, statusFilter } = useSelector(
    (store) => store.leave,
  );
  const dispatch = useDispatch();

  const updateStatusHandler = async (leaveId, status) => {
    try {
      const promise = axios.patch(
        `${LEAVE_API_END_POINT}/updateStatus/${leaveId}/status`,
        { status },
        { withCredentials: true },
      );

      toast.promise(promise, {
        pending: `Updating leave status...`,
        success: `Leave ${status} successfully`,
        error: {
          render({ data }) {
            return (
              data?.response?.data?.message || "Failed to update leave status"
            );
          },
        },
      });

      const res = await promise;

      if (res.data.success) {
        const updatedLeaves = leaveAllEmployee.map((item) =>
          item._id === leaveId ? { ...item, status } : item,
        );

        dispatch(setLeaveAllEmployee(updatedLeaves));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const statusBadge = (status) => {
    if (status === "approved") return "approved";
    if (status === "rejected") return "rejected";
    return "pending";
  };

  const filterLeaves = leaveAllEmployee.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) {
      return false;
    }

    if (
      !item.employee?.fullName
        ?.toLowerCase()
        .includes(searchLeaveText.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const pendingCount = leaveAllEmployee.filter(
    (item) => item.status === "pending",
  ).length;

  const approvedCount = leaveAllEmployee.filter(
    (item) => item.status === "approved",
  ).length;

  const rejectedCount = leaveAllEmployee.filter(
    (item) => item.status === "rejected",
  ).length;
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
        </div>

        <div className="leave-stats">
          <div className="stat pending">
            <span>{pendingCount}</span>
            <p>Pending</p>
          </div>
          <div className="stat approved">
            <span>{approvedCount}</span>
            <p>Approved</p>
          </div>
          <div className="stat rejected">
            <span>{rejectedCount}</span>
            <p>Rejected</p>
          </div>
        </div>

        <div className="leave-filters">
          <div className="row align-items-center g-4 employee-search">
            <div className="col-12 col-md-10 col-lg-10">
              <div className="employee-search-input">
                <CiSearch className="search-icon" />
                <input
                  type="text"
                  value={searchLeaveText}
                  onChange={(e) => dispatch(setSearchLeaveText(e.target.value))}
                  placeholder="Search employees, roles..."
                />
              </div>
            </div>
            <div className="col-12 col-md-2 col-lg-2">
              <div className="select-search">
                <Select
                  options={statusOptions}
                  onChange={(option) => dispatch(setStatusFilter(option.value))}
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
              {filterLeaves.length === 0 ? (
                <tr>
                  <td colSpan="6" className="leave-content py-4 text-center">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                filterLeaves.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="emp">
                        <div className="avtar-info">
                          {item.employee?.fullName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4>{item.employee.fullName}</h4>
                          <span>{item.employee.role}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span>{item.leaveType}</span>
                    </td>
                    <td>
                      <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td>{item.reason}</td>
                    <td>
                      <span className={`status ${statusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        className="approve"
                        disabled={item.status === "approved"}
                        onClick={() =>
                          updateStatusHandler(item._id, "approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="reject"
                        disabled={item.status === "rejected"}
                        onClick={() =>
                          updateStatusHandler(item._id, "rejected")
                        }
                      >
                        Reject
                      </button>
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
