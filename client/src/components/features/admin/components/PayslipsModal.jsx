import { useState } from "react";
import Select from "react-select";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import useGetEmployee from "../../../../hooks/useGetEmployee";

const PayslipsModal = () => {
  useGetEmployee();
  const { employee } = useSelector((store) => store.employee);

  const employeeOption = employee.map((emp) => {
    return {
      value: emp._id,
      label: `${emp.firstName} ${emp.lastName} - ${emp.position}`,
    };
  });

  const options = [
    { value: "1", label: "Mark Taylor - UI Designer" },
    { value: "2", label: "Sophia Turner - Marketing Manager" },
    { value: "3", label: "James Lee - Developer" },
    { value: "4", label: "Anne Martin - HR Executive" },
    { value: "5", label: "Robert Brown - Finance Manager" },
    { value: "6", label: "Emily Davis - Operations Lead" },
    { value: "7", label: "Michael Wilson - IT Support" },
    { value: "8", label: "Sarah Johnson - Customer Success" },
    { value: "9", label: "David Garcia - Design Lead" },
    { value: "10", label: "Lisa Anderson - Product Manager" },
  ];

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <div
      className="modal fade"
      id="payslipsModal"
      tabIndex="-1"
      aria-labelledby="payslipsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered payslips-modal-dialog">
        <div className="modal-content payslips-modal-content">
          <div className="payslips-modal-header">
            <div>
              <h2 className="payslips-modal-title">Generate Monthly Payslip</h2>
              <p className="payslips-modal-subtitle">
                Create and manage employee salary slips
              </p>
            </div>
            <button
              type="button"
              className="btn-close payslips-modal-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="payslips-modal-body">
            <div className="payslips-form-section">
              <div className="form-group-full">
                <label className="payslips-form-label">Select Employee *</label>
                <Select
                  options={employeeOption}
                  placeholder="Choose an employee..."
                  classNamePrefix="payslips-select"
                  menuPlacement="top"
                  isSearchable={true}
                />
              </div>

              <div className="form-group-row">
                <div className="form-group-half">
                  <label className="payslips-form-label">Month *</label>
                  <Select
                    options={months}
                    placeholder="Select month..."
                    classNamePrefix="payslips-select"
                    menuPlacement="bottom"
                  />
                </div>
                <div className="form-group-half">
                  <label className="payslips-form-label">Year *</label>
                  <input
                    type="number"
                    name="year"
                    className="payslips-form-input"
                    placeholder="2026"
                    min="2000"
                    max="2099"
                  />
                </div>
              </div>

              <div className="form-divider"></div>

              <div className="form-group-row">
                <div className="form-group-half">
                  <label className="payslips-form-label">Allowances</label>
                  <input
                    type="number"
                    name="allowances"
                    className="payslips-form-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="form-group-half">
                  <label className="payslips-form-label">Deductions</label>
                  <input
                    type="number"
                    name="deductions"
                    className="payslips-form-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="payslips-modal-footer">
            <button
              type="button"
              className="employee-add-btn d-flex align-items-center gap-2"
            >
              <FaPlus /> Generate Payslip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipsModal;
