import { MdOutlineFileDownload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useGetParticularEmployeePayslip from "../../../../hooks/useGetParticularEmployeePayslip";
import { setSelectedPayslipId } from "../../../../redux/payslipSlice";
import { useNavigate, useParams } from "react-router-dom";
import useGetEmployeeSinglePayslip from "../../../../hooks/useGetEmployeeSinglePayslip";
const EmployeePayslipDetails = () => {
  const { id } = useParams();
  useGetParticularEmployeePayslip();
  useGetEmployeeSinglePayslip(id);
  const { employeeParticularPayslip } = useSelector((store) => store.payslip);
  const { singlePayslipData } = useSelector((store) => store.payslip);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="employee-payslip py-4">
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold">Payslips</h2>
          <p className="text-muted mb-0">Your payslip history</p>
        </div>

        {/* Table Card */}
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                {/* Table Head */}
                <thead className="bg-light text-uppercase small text-muted">
                  <tr>
                    <th className="px-4 py-3">Period</th>
                    <th className="px-4 py-3">Basic Salary</th>
                    <th className="px-4 py-3">Net Salary</th>
                    <th className="px-4 py-3 text-end">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {employeeParticularPayslip?.map((item) => (
                    <tr key={item.id} className="border-top">
                      <td className="px-4 py-3 fw-medium">
                        {new Date(item.year, item.month - 1).toLocaleString(
                          "default",
                          {
                            month: "long",
                          },
                        )}
                        {item.year}
                      </td>
                      <td className="px-4 py-3 text-muted">
                        ${item.basicSalary.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 fw-semibold text-dark">
                        ${item.netSalary.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-end">
                        <button
                          onClick={() => {
                            navigate(`/employee/payslip/${item._id}`);
                          }}
                          className="btn download-btn d-inline-flex align-items-center gap-2"
                        >
                          <MdOutlineFileDownload />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePayslipDetails;
