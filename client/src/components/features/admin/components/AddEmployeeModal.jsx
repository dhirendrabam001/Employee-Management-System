import axios from "axios";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { EMPLOYEE_API_END_POINT } from "../../../../utils/constantUrl";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setEmployee } from "../../../../redux/employeeSlice";
// import Login from "../../../auth/components/Login";
const AddEmployeeModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employee } = useSelector((store) => store.employee);

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

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    date: "",
    bio: "",
    department: "",
    position: "",
    salary: "",
    allowance: "",
    deduction: "",
    email: "",
    password: "",
    role: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    console.log("Input data", input);
    e.preventDefault();

    try {
      const promise = axios.post(
        `${EMPLOYEE_API_END_POINT}/addEmployee`,
        input,
        {
          withCredentials: true,
        },
      );

      toast.promise(promise, {
        pending: "Added new employee",
        success: "Employee added successfully",
        error: {
          render({ data }) {
            return (
              data?.response?.data?.message || "Employee data is not added"
            );
          },
        },
      });

      const res = await promise;
      if (res.data.success) {
        dispatch(setEmployee([...employee, res.data.employee]));
        const modalEl = document.getElementById("addEmployeeModal");

        if (window.bootstrap && modalEl) {
          const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
          console.log(window.bootstrap);
          modalInstance?.hide();
        }
        navigate("/admin/employees");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              <form onSubmit={submitHandler}>
                <div className="row mt-3 align-items-center g-4">
                  <div className="col-12 col-md-6 col-lg-6 mb-1">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      name="firstName"
                      value={input.firstName}
                      onChange={changeHandler}
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-6 mb-1">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      name="lastName"
                      value={input.lastName}
                      onChange={changeHandler}
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-6 mb-1">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      name="phone"
                      value={input.phone}
                      onChange={changeHandler}
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-6 mb-1">
                    <label>Join Date</label>
                    <input
                      type="date"
                      className="form-control custom-input"
                      name="date"
                      value={input.date}
                      onChange={changeHandler}
                    />
                  </div>

                  <div className="col-12 mb-1">
                    <label>Bio (Optional)</label>
                    <textarea
                      type="text"
                      className="form-control custom-input"
                      name="bio"
                      value={input.bio}
                      onChange={changeHandler}
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
                        value={options.find(
                          (option) => option.value === input.department,
                        )}
                        name="department"
                        onChange={(selectOption) =>
                          setInput({ ...input, department: selectOption.label })
                        }
                        placeholder="Select Department"
                        classNamePrefix="select-custom"
                        menuPlacement="top"
                      ></Select>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>Position</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        name="position"
                        value={input.position}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>Basic Salary</label>
                      <input
                        type="number"
                        className="form-control custom-input"
                        name="salary"
                        value={input.salary}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>Allowances</label>
                      <input
                        type="number"
                        className="form-control custom-input"
                        name="allowance"
                        value={input.allowance}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>Deductions</label>
                      <input
                        type="number"
                        className="form-control custom-input"
                        name="deduction"
                        value={input.deduction}
                        onChange={changeHandler}
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
                        type="email"
                        className="form-control custom-input"
                        name="email"
                        value={input.email}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>Temporary Password</label>
                      <input
                        type="password"
                        className="form-control custom-input"
                        name="password"
                        value={input.password}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label>System Role</label>
                      <Select
                        options={systemRole}
                        value={options.find(
                          (option) => option.value === input.role,
                        )}
                        onChange={(selectRole) =>
                          setInput({
                            ...input,
                            role: selectRole.label.toLowerCase(),
                          })
                        }
                        placeholder="Select System Role"
                        classNamePrefix="select-custom"
                        menuPlacement="bottom"
                      ></Select>
                    </div>
                  </div>
                </div>
                {/* FOOTER */}
                <div className="modal-footer border-0">
                  <button
                    type="submit"
                    className="create-btn d-flex align-items-center gap-2"
                  >
                    <FaPlus />
                    Create New Employee
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

export default AddEmployeeModal;
