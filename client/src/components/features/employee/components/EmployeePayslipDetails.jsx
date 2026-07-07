import { MdOutlineFileDownload } from "react-icons/md";
import useGetPayslipById from "../../../../hooks/useGetPayslipById";
import { useSelector } from "react-redux";
import useGetAllPayslip from "../../../../hooks/useGetAllPayslips";
const EmployeePayslipDetails = () => {
  useGetAllPayslip();
  useGetPayslipById();
  const { user } = useSelector((store) => store.auth);
  console.log(user);

  const { payslip } = useSelector((store) => store.payslip);
  console.log(payslip);

  const employeePayslip = payslip.filter(
    (item) => item.employee?._id === user?._id,
  );

  console.log("paylispsid", employeePayslip);

  const payslips = [
    {
      id: 1,
      period: "January 2026",
      basicSalary: 1000,
      netSalary: 1000,
    },
  ];

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
                  {payslips.map((item) => (
                    <tr key={item.id} className="border-top">
                      <td className="px-4 py-3 fw-medium">{item.period}</td>
                      <td className="px-4 py-3 text-muted">
                        ${item.basicSalary.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 fw-semibold text-dark">
                        ${item.netSalary.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-end">
                        <button className="btn download-btn d-inline-flex align-items-center gap-2">
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
