import {
  FiDownload,
  FiMail,
  FiCalendar,
  FiBriefcase,
  FiShield,
  FiCreditCard,
  FiPrinter,
} from "react-icons/fi";
import { CgMail } from "react-icons/cg";
import { FaCriticalRole } from "react-icons/fa";

const PrintPayslip = () => {
  const employee = {
    name: "James Thomas",
    position: "Marketing",
    role: "Full stack developer",
    email: "tem1@gmail.com",
    period: "February 2026",
    payslipId: "PS-2026-02-1024",
    payDate: "28 Feb 2026",
    paymentMethod: "Bank Transfer",
    paymentMask: "**** **** **** 1234",
    basicSalary: 1000,
    allowances: 100,
    deductions: 100,
  };

  const netSalary =
    employee.basicSalary + employee.allowances - employee.deductions;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="payslip-page">
      <div className="container">
        <div className="payslip-card">
          <div className="row g-3">
            <div className="col-12 col-md-4 col-lg-4">
              <div className="payslip-card__top">
                <div className="payslip-card__profile">
                  <div className="payslip-avatar">JT</div>
                  <div>
                    <p className="payslip-label">EMPLOYEE NAME</p>
                    <h2>{employee.name}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-5">
              {/* second row */}
              <div className="row g-3">
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="payslip-meta">
                    <div className="payslip-meta__item">
                      <FiBriefcase className="meta-icon" />
                      <div>
                        <p>POSITION</p>
                        <strong>{employee.position}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 2 */}
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="payslip-meta">
                    <div className="payslip-meta__item">
                      <FiCalendar className="meta-icon" />
                      <div>
                        <p>PERIOD</p>
                        <strong>{employee.period}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 2 */}
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="payslip-meta">
                    <div className="payslip-meta__item">
                      <CgMail className="meta-icon" />
                      <div>
                        <p>EMAIL</p>
                        <strong>{employee.email}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 4 */}
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="payslip-meta">
                    <div className="payslip-meta__item">
                      <FaCriticalRole className="meta-icon" />
                      <div>
                        <p>ROLE</p>
                        <strong>{employee.role}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3 col-lg-3">
              <div className="payslip-id-card">
                <p>Payslip ID</p>
                <strong>{employee.payslipId}</strong>
              </div>
            </div>
          </div>
          {/* table */}
          <div className="payslip-table mt-4">
            <div className="payslip-table__head">
              <span>EARNINGS & DEDUCTIONS</span>
              <span>DESCRIPTION</span>
              <span>AMOUNT</span>
            </div>

            <div className="payslip-table__row">
              <div className="payslip-table__title">
                <div className="table-dot table-dot--green" />
                <div>
                  <p>Basic Salary</p>
                  <span>Monthly basic salary</span>
                </div>
              </div>
              <div className="payslip-table__desc">Monthly basic salary</div>
              <div className="payslip-table__amount">
                ${employee.basicSalary.toFixed(2)}
              </div>
            </div>

            <div className="payslip-table__row">
              <div className="payslip-table__title">
                <div className="table-dot table-dot--blue" />
                <div>
                  <p>Allowances</p>
                  <span>Additional allowances</span>
                </div>
              </div>
              <div className="payslip-table__desc">Additional allowances</div>
              <div className="payslip-table__amount payslip-positive">
                +${employee.allowances.toFixed(2)}
              </div>
            </div>

            <div className="payslip-table__row">
              <div className="payslip-table__title">
                <div className="table-dot table-dot--red" />
                <div>
                  <p>Deductions</p>
                  <span>Tax, insurance & other deductions</span>
                </div>
              </div>
              <div className="payslip-table__desc">
                Tax, insurance & other deductions
              </div>
              <div className="payslip-table__amount payslip-negative">
                -${employee.deductions.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="payslip-total">
            <div>
              <p>NET SALARY</p>
              <span>(Total Earnings - Total Deductions)</span>
            </div>
            <strong>${netSalary.toFixed(2)}</strong>
          </div>

          <div className="payslip-card__bottom">
            <div className="bottom-item">
              <div className="bottom-icon-box">
                <FiCalendar />
              </div>
              <div>
                <p>PAY DATE</p>
                <strong>{employee.payDate}</strong>
              </div>
            </div>

            <div className="bottom-item">
              <div className="bottom-icon-box">
                <FiCreditCard />
              </div>
              <div>
                <p>PAYMENT METHOD</p>
                <strong>{employee.paymentMethod}</strong>
                <span>{employee.paymentMask}</span>
              </div>
            </div>

            <div className="bottom-note">
              <div className="bottom-icon-box bottom-icon-box--muted">
                <FiShield />
              </div>
              <p>
                This is a system generated payslip and does not require
                signature.
              </p>
            </div>
          </div>

          <div className="payslip-actions">
            <button type="button" className="secondary-btn">
              <FiDownload /> Download PDF
            </button>
            <button type="button" className="primary-btn" onClick={handlePrint}>
              <FiPrinter /> Print Payslip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrintPayslip;
