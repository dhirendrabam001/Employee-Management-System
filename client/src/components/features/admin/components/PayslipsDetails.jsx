import { FaDownload, FaCalendarAlt, FaEllipsisV } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import PayslipsModal from "./PayslipsModal";

const PayslipsDetails = () => {
  const navigate = useNavigate();
  const periodOptions = [
    { value: "all", label: "All Periods" },
    { value: "2026-01", label: "January 2026" },
    { value: "2025-12", label: "December 2025" },
    { value: "2025-11", label: "November 2025" },
  ];

  const payslips = [
    {
      id: 1,
      period: "January 2026",
      range: "01 Jan 2026 - 31 Jan 2026",
      basicSalary: "$1,000.00",
      netSalary: "$1,000.00",
      status: "Paid",
    },
    {
      id: 2,
      period: "December 2025",
      range: "01 Dec 2025 - 31 Dec 2025",
      basicSalary: "$980.00",
      netSalary: "$980.00",
      status: "Paid",
    },
    {
      id: 3,
      period: "November 2025",
      range: "01 Nov 2025 - 30 Nov 2025",
      basicSalary: "$1,020.00",
      netSalary: "$1,020.00",
      status: "Paid",
    },
  ];

  return (
    <>
      <section className="payslips-panel">
        <div className="container">
          {/* Hero Section */}
          <div className="payslips-hero-card">
            <div className="row align-items-center g-4">
              <div className="col-12 col-md-10">
                <div className="hero-left d-flex align-items-center gap-3">
                  <div className="hero-icon">
                    <HiOutlineDocumentText />
                  </div>

                  <div>
                    <h2 className="mb-1">Payslips</h2>
                    <p className="mb-0">
                      View and download your payslip history.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-2 payslips-btn">
                <button
                  className="employee-add-btn d-flex align-items-center gap-2"
                  data-bs-toggle="modal"
                  data-bs-target="#payslipsModal"
                >
                  <FaPlus />
                  Generate Payslips
                </button>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="payslip-history-card">
            <div className="history-card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
              <div className="history-title">
                <h3 className="mb-0">Payslip History</h3>
              </div>

              <div className="history-filter">
                <Select
                  options={periodOptions}
                  classNamePrefix="select-custom"
                  menuPlacement="top"
                />
              </div>
            </div>

            {/* Responsive Bootstrap Table */}
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>EMPLOYEE</th>
                    <th>PERIOD</th>
                    <th>BASIC SALARY</th>
                    <th>NET SALARY</th>
                    <th>STATUS</th>
                    <th className="text-center">ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {payslips.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-5">
                        No payslips found
                      </td>
                    </tr>
                  ) : (
                    payslips.map((item) => (
                      <tr key={item.id}>
                        <td>Dhirendra Bam</td>
                        <td>{item.period}</td>

                        <td>{item.basicSalary}</td>

                        <td className="fw-semibold text-success">
                          {item.netSalary}
                        </td>

                        <td>
                          <span className="badge bg-success-subtle text-success px-3 py-2">
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-sm download-btn d-flex align-items-center gap-2"
                              onClick={() =>
                                navigate(`/admin/payslip/print/${item._id}`)
                              }
                            >
                              <FaDownload />
                              Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <PayslipsModal />
    </>
  );
};

export default PayslipsDetails;
