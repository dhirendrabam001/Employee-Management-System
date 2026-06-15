import { useState } from "react";
import Select from "react-select";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import useGetEmployee from "../../../../hooks/useGetEmployee";
import axios from "axios";
import { PAYSLIPS_API_END_POINT } from "../../../../utils/constantUrl";
import { toast } from "react-toastify";
import { setPayslip } from "../../../../redux/payslipSlice";

const PayslipsModal = () => {
  useGetEmployee({ showLoader: false });
  const { employee } = useSelector((store) => store.employee);
  console.log("employee", employee);

  const dispatch = useDispatch();
  const employeeOption = employee.map((emp) => {
    return {
      value: emp._id,
      label: `${emp.firstName} ${emp.lastName} - ${emp.position}`,
    };
  });

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

  const [input, setInput] = useState({
    employee: "",
    month: "",
    year: "",
    allowances: "",
    deductions: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeSelectHandler = (selectOption, name) => {
    setInput({ ...input, [name]: selectOption.value });
  };

  const submitHander = async (e) => {
    e.preventDefault();

    try {
      const promise = axios.post(`${PAYSLIPS_API_END_POINT}/payslips`, input, {
        withCredentials: true,
      });

      toast.promise(promise, {
        pending: "Added new payslip...",
        success: "Payslip added successfully",
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Payslips is not added";
          },
        },
      });

      const res = await promise;
      if (res.data.success) {
        dispatch(setPayslip([...payslips, res.data.payslip]));
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              <form onSubmit={submitHander}>
                <div className="form-group-full mb-3">
                  <label className="payslips-form-label">
                    Select Employee *
                  </label>
                  <Select
                    options={employeeOption}
                    name="employee"
                    value={employeeOption.find(
                      (opt) => opt.value === input.employee,
                    )}
                    onChange={(option) =>
                      changeSelectHandler(option, "employee")
                    }
                    placeholder="Choose an employee..."
                    classNamePrefix="payslips-select"
                    menuPlacement="bottom"
                    isSearchable={true}
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group-half mb-2">
                    <label className="payslips-form-label">Month *</label>
                    <Select
                      options={months}
                      name="month"
                      value={months.find((opt) => opt.value === input.month)}
                      onChange={(option) =>
                        changeSelectHandler(option, "month")
                      }
                      placeholder="Select month..."
                      classNamePrefix="payslips-select"
                      menuPlacement="bottom"
                    />
                  </div>
                  <div className="form-group-half mb-2">
                    <label className="payslips-form-label">Year *</label>
                    <input
                      type="number"
                      name="year"
                      value={input.year}
                      onChange={changeHandler}
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
                      value={input.allowances}
                      onChange={changeHandler}
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
                      value={input.deductions}
                      onChange={changeHandler}
                      className="payslips-form-input"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="payslips-modal-footer">
                  <button
                    type="submit"
                    className="employee-add-btn d-flex align-items-center gap-2"
                  >
                    <FaPlus /> Generate Payslip
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipsModal;
