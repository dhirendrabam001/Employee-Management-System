import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";
const AddEmployeeModal = () => {
  const [department, setDepartment] = useState(null);
  const [role, setRole] = useState(null);

  const options = [
    { value: "1", label: "Engineering" },
    { value: "2", label: "Human Resources" },
    { value: "3", label: "Marketing" },
    { value: "4", label: "Sales" },
    { value: "5", label: "Finance" },
    { value: "6", label: "Operations" },
    { value: "7", label: "IT Support" },
    { value: "8", label: "Customer Success" },
    { value: "9", label: "Design" },
    { value: "10", label: "Product Management" },
  ];

  const systemRole = [
    { value: "1", label: "Admin" },
    { value: "2", label: "Employee" },
  ];

  return (
    <div
      className="modal fade employee-info"
      id="addEmployeeModal"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content custom-modal">
          {/* HEADER */}
          <div className="modal-header border-0">
            <div>
              <h5 className="modal-title fw-bold">Add New Employee</h5>
              <p className="text-muted small mb-0">
                Create a user account and employee profile
              </p>
            </div>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          {/* BODY */}

          <div className="modal-body">
            <div className="form-section custom-section">
              <h6 className="section-title">Personal Information</h6>
              <hr className="add-hr" />
              <form action="">
                <div className="row mt-3 align-items-center g-4">
                  <div className="col-12 col-md-6 col-lg-6 mb-1">
                    <label>First Name</label>
                    <input type="text" className="form-control custom-input" />
                  </div>

                  <div className="col-12 col-md-6 col-lg-6 mb-1">
                    <label>Last Name</label>
                    <input type="text" className="form-control custom-input" />
                  </div>

                  <div className="col-12 col-md-6 col-lg-6 mb-1">
                    <label>Phone Number</label>
                    <input type="text" className="form-control custom-input" />
                  </div>

                  <div className="col-12 col-md-6 col-lg-6 mb-1">
                    <label>Join Date</label>
                    <input type="date" className="form-control custom-input" />
                  </div>

                  <div className="col-12 mb-1">
                    <label>Bio (Optional)</label>
                    <textarea
                      type="text"
                      className="form-control custom-input"
                      rows="3"
                    />
                  </div>
                </div>

                {/* second from  */}
                <div className="custom-section mt-4">
                  <h6 className="section-title">Employees Details</h6>
                  <hr className="add-hr" />
                  <div className="row mt-3 align-items-center g-4">
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label htmlFor="department">Department</label>
                      <Select
                        options={options}
                        value={department}
                        onChange={(e) => setDepartment(e)}
                        placeholder="Select Department"
                        classNamePrefix="select-custom"
                        menuPlacement="top"
                      ></Select>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>Position</label>
                      <input
                        type="number"
                        className="form-control custom-input"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>Basic Salary</label>
                      <input
                        type="number"
                        className="form-control custom-input"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>Allowances</label>
                      <input
                        type="number"
                        className="form-control custom-input"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>Deductions</label>
                      <input
                        type="number"
                        className="form-control custom-input"
                      />
                    </div>
                  </div>
                </div>
                {/* third from  */}
                <div className="custom-section mt-4">
                  <h6 className="section-title">Account Setup</h6>
                  <hr className="add-hr" />
                  <div className="row mt-3 align-items-center g-4">
                    <div className="col-12mb-1">
                      <label htmlFor="department">Work Email</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>Temporary Password</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>System Role</label>
                      <Select
                        options={systemRole}
                        value={role}
                        onChange={(e) => setRole(e)}
                        placeholder="Select System Role"
                        classNamePrefix="select-custom"
                        menuPlacement="bottom"
                      ></Select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer border-0">
            <button className="create-btn d-flex align-items-center gap-2">
              <FaPlus />
              Create New Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
