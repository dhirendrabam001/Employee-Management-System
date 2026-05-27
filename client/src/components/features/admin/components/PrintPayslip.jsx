import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetPayslipById from "../../../../hooks/useGetPayslipById";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const PrintPayslip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singlePayslipData } = useSelector((store) => store.payslip);

  useGetPayslipById(id);

  const employee = singlePayslipData?.employee;
  const period = singlePayslipData
    ? `${singlePayslipData.month} ${singlePayslipData.year}`
    : "";

  const formatCurrency = (value) => currencyFormatter.format(value ?? 0);

  if (!singlePayslipData) {
    return (
      <div className="payslip-page">
        <div className="container">
          <div className="payslip-card text-center py-5">
            <p>Loading payslip details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payslip-page">
      <div className="container">
        <div className="payslip-action-bar">
          <div>
            <p className="text-uppercase text-muted mb-2">Payslip</p>
            <h1 className="mb-1">{`Paystub – ${period}`}</h1>
            <p className="text-muted">Professional employee payslip summary</p>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back
            </button>
            <button className="btn btn-primary" onClick={() => window.print()}>
              Print Payslip
            </button>
          </div>
        </div>

        <div className="payslip-card">
          <div className="payslip-card__profile mb-4">
            <div className="payslip-avatar">
              {employee?.firstName?.[0]}
              {employee?.lastName?.[0]}
            </div>
            <div>
              <p className="payslip-label">Employee</p>
              <h2>{`${employee?.firstName || ""} ${employee?.lastName || ""}`}</h2>
            </div>
          </div>

          <div className="payslip-info-grid mb-4">
            <div className="payslip-info-item">
              <p>Employee Name</p>
              <strong>{`${employee?.firstName || ""} ${employee?.lastName || ""}`}</strong>
            </div>
            <div className="payslip-info-item">
              <p>Position</p>
              <strong>{employee?.position || "—"}</strong>
            </div>
            <div className="payslip-info-item">
              <p>Email</p>
              <strong>{employee?.email || "—"}</strong>
            </div>
            <div className="payslip-info-item">
              <p>Period</p>
              <strong>{period}</strong>
            </div>
          </div>

          <div className="payslip-table">
            <div className="payslip-table__head">
              <span>Description</span>
              <span className="text-end">Amount</span>
            </div>
            <div className="payslip-table__row">
              <div className="payslip-table__title">
                <div className="table-dot table-dot--blue" />
                <div>
                  <p>Basic Salary</p>
                  <span>{`${singlePayslipData.month} ${singlePayslipData.year}`}</span>
                </div>
              </div>
              <div className="payslip-table__amount">
                {formatCurrency(singlePayslipData.basicSalary)}
              </div>
            </div>
            <div className="payslip-table__row">
              <div className="payslip-table__title">
                <div className="table-dot table-dot--green" />
                <div>
                  <p>Allowances</p>
                  <span>Additional benefits</span>
                </div>
              </div>
              <div className="payslip-table__amount payslip-positive">
                {formatCurrency(singlePayslipData.allowances)}
              </div>
            </div>
            <div className="payslip-table__row">
              <div className="payslip-table__title">
                <div className="table-dot table-dot--red" />
                <div>
                  <p>Deductions</p>
                  <span>Tax and other deductions</span>
                </div>
              </div>
              <div className="payslip-table__amount payslip-negative">
                {formatCurrency(singlePayslipData.deductions)}
              </div>
            </div>
          </div>

          <div className="payslip-total">
            <div>
              <p>Net Salary</p>
              <span>Final payment after adjustments</span>
            </div>
            <strong>{formatCurrency(singlePayslipData.netSalary)}</strong>
          </div>

          <div className="payslip-card__bottom">
            <div className="bottom-item">
              <div className="bottom-icon-box">B</div>
              <div>
                <p className="mb-1">Basic salary</p>
                <strong>{formatCurrency(singlePayslipData.basicSalary)}</strong>
              </div>
            </div>
            <div className="bottom-item">
              <div className="bottom-icon-box">A</div>
              <div>
                <p className="mb-1">Allowances</p>
                <strong>{formatCurrency(singlePayslipData.allowances)}</strong>
              </div>
            </div>
            <div className="bottom-item">
              <div className="bottom-icon-box">D</div>
              <div>
                <p className="mb-1">Deductions</p>
                <strong>{formatCurrency(singlePayslipData.deductions)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPayslip;
