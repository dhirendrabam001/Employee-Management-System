import { FaDownload, FaCalendarAlt, FaEllipsisV } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import PayslipsModal from "./PayslipsModal";
import useGetAllPayslip from "../../../../hooks/useGetAllPayslips";
import { useDispatch, useSelector } from "react-redux";
import {
  setPayslip,
  setSearchName,
  setSelectedPayslipId,
} from "../../../../redux/payslipSlice";
import useGetPayslipById from "../../../../hooks/useGetPayslipById";
import axios from "axios";
import { PAYSLIPS_API_END_POINT } from "../../../../utils/constantUrl";
import { toast } from "react-toastify";
import { showSuccess } from "../../../../utils/toast";

const PayslipsDetails = () => {
  useGetAllPayslip();

  const { payslip, searchName, selectedPayslipId } = useSelector(
    (store) => store.payslip,
  );

  useGetPayslipById(selectedPayslipId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filterPayslip = payslip.filter((item) => {
    const fullName = item.employee
      ? `${item.employee.firstName} ${item.employee.lastName}`.toLowerCase()
      : "";

    return fullName.includes(searchName.toLowerCase());
  });

  // get status
  const getStatusBadge = (status) => {
    if (status === "Paid") {
      return "bg-success-subtle text-success";
    } else if (status === "Pending") {
      return "bg-warning-subtle text-warning";
    } else if (status === "Processing") {
      return "bg-info-subtle text-info";
    } else {
      return "bg-secondary-subtle text-secondary";
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${PAYSLIPS_API_END_POINT}/updateStatus/${id}/status`,
        { status },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        const updateList = payslip.map((item) =>
          item._id === id ? res.data.payslip : item,
        );
        dispatch(setPayslip(updateList));
        showSuccess("Status Updated");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                      View and download your Professional employee payslip
                      summary.
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
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => dispatch(setSearchName(e.target.value))}
                  className="form-control custom-input"
                  placeholder="Seach payslip by name..."
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
                  {filterPayslip.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-5">
                        No payslips found
                      </td>
                    </tr>
                  ) : (
                    filterPayslip.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.employee
                            ? `${item.employee.firstName} ${item.employee.lastName}`
                            : "Unknown Employee"}
                        </td>
                        <td>{`${item.month} ${item.year}`}</td>

                        <td>{item.basicSalary}</td>

                        <td className="fw-semibold text-success">
                          {item.netSalary}
                        </td>

                        <td>
                          <span
                            className={`badge px-3 py-2 ${getStatusBadge(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-sm download-btn d-flex align-items-center gap-2"
                              onClick={() => {
                                if (!item.employee) return;
                                dispatch(setSelectedPayslipId(item._id));
                                navigate(`/admin/payslip/print/${item._id}`);
                              }}
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
