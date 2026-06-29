import { FaPlus } from "react-icons/fa6";
import { FaThermometerHalf, FaUmbrellaBeach, FaHome } from "react-icons/fa";
import { GiPalmTree } from "react-icons/gi";
import LeaveEmployeeModal from "./LeaveEmployeeModal";
import LeaveEmployeeTable from "./LeaveEmployeeTable";
import { useSelector } from "react-redux";
import useGetSingleEmployeLeave from "../../../../hooks/useGetSingleEmployeLeave";

const LeaveEmployeeDetails = () => {
  useGetSingleEmployeLeave();
  const { leave } = useSelector((store) => store.leave);
  const sickLeave = leave.filter((l) => l.leaveType === "sick").length;
  const casualLeave = leave.filter((l) => l.leaveType === "casual").length;
  const annualLeave = leave.filter((l) => l.leaveType === "annual").length;
  const workhomeLeave = leave.filter((l) => l.leaveType === "workhome").length;

  const leaveEmployeeCard = [
    { icon: <FaThermometerHalf />, title: "Sick Leave", count: sickLeave },
    { icon: <FaUmbrellaBeach />, title: "Casual Leave", count: casualLeave },
    { icon: <GiPalmTree />, title: "Annual Leave", count: annualLeave },
    { icon: <FaHome />, title: "Work From Home", count: workhomeLeave },
  ];
  return (
    <>
      <div className="leave-employee">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-10">
              <div className="leave-heading">
                <h2>Leave Management</h2>
                <p>Your leave history and requests</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2">
              <button
                className="employee-add-btn d-flex align-items-center gap-2"
                data-bs-toggle="modal"
                data-bs-target="#leaveEmployeeModal"
              >
                <FaPlus />
                Apply Leave
              </button>
            </div>
          </div>

          {/* leave card */}
          <div className="leave-card">
            <div className="row">
              {leaveEmployeeCard.map((item, index) => {
                return (
                  <div className="col-12 col-md-6 col-lg-3" key={index}>
                    <div className="leave-card-box">
                      <div className="leave-icon">{item.icon}</div>
                      <div className="leave-content">
                        <p>{item.title}</p>
                        <h2>{item.count}</h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="leave-table-info mt-4">
            <LeaveEmployeeTable />
          </div>
        </div>
      </div>
      <LeaveEmployeeModal />
    </>
  );
};

export default LeaveEmployeeDetails;
