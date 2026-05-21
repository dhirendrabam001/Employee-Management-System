import { useMemo, useState } from "react";
import { FaDownload, FaCalendarAlt, FaEllipsisV } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";
import PayslipsModal from "./PayslipsModal";

const PayslipsDetails = () => {
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
          <div className="payslips-hero-card">
            <div className="row align-items-center g-4">
              <div className="col-12 col-md-10 col-lg-10">
                <div className="hero-left">
                  <div className="hero-icon">
                    <HiOutlineDocumentText />
                  </div>
                  <div>
                    <h2>Payslips</h2>
                    <p>View and download your payslip history.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2 col-lg-2 payslips-btn">
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
          <div className="payslip-history-card">
            <div className="history-card-header">
              <div className="history-title">
                <h3>Payslip History</h3>
              </div>
              <div className="history-filter">
                <Select
                  options={periodOptions}
                  classNamePrefix="select-custom"
                  menuPlacement="top"
                />
              </div>
            </div>

            <div className="history-table">
              <div className="history-table-head">
                <span>PERIOD</span>
                <span>BASIC SALARY</span>
                <span>NET SALARY</span>
                <span>ACTIONS</span>
              </div>

              {payslips.map((item) => (
                <div key={item.id} className="history-row">
                  <div className="period-cell">
                    <div className="period-icon">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <div className="period-title">{item.period}</div>
                      <div className="period-range">{item.range}</div>
                    </div>
                  </div>
                  <div className="salary-cell">{item.basicSalary}</div>
                  <div className="salary-cell net-salary">{item.netSalary}</div>
                  <div className="actions-cell">
                    <button className="download-btn">
                      <FaDownload /> Download PDF
                    </button>
                    <button className="more-btn">
                      <FaEllipsisV />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <PayslipsModal />
    </>
  );
};

export default PayslipsDetails;
