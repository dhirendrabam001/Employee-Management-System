import axios from "axios";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";
import { EMPLOYEE_API_END_POINT } from "../../../../utils/constantUrl";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSingleEmployeeData } from "../../../../redux/employeeSlice";
import { useEffect } from "react";
import useGetEmployeeById from "../../../../hooks/useGetEmployeeById";
const UpdateProfileModal = () => {
  const dispatch = useDispatch();
  const { selectedEmployeeId, singleEmployeeData } = useSelector(
    (store) => store.employee,
  );
  useGetEmployeeById(selectedEmployeeId); //used hoooks and updated id on redux

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

  const status = [
    { value: "1", label: "Active" },
    { value: "2", label: "Inactive" },
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
    status: "",
    email: "",
    password: "",
    role: "",
  });

  // prefield data
  useEffect(() => {
    if (singleEmployeeData) {
      setInput({
        firstName: singleEmployeeData.firstName || "",
        lastName: singleEmployeeData.lastName || "",
        phone: singleEmployeeData.phone || "",
        date: singleEmployeeData.date
          ? singleEmployeeData.date.split("T")[0]
          : "",
        bio: singleEmployeeData.bio || "",
        department: singleEmployeeData.department || "",
        position: singleEmployeeData.position || "",
        salary: singleEmployeeData.salary || "",
        allowance: singleEmployeeData.allowance || "",
        deduction: singleEmployeeData.deduction || "",
        status: singleEmployeeData.status || "",
        email: singleEmployeeData.email || "",
        password: "",
        role: singleEmployeeData.role || "",
      });
    }
  }, [singleEmployeeData]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    console.log("Input data", input);
    e.preventDefault();

    try {
      const promise = axios.put(
        `${EMPLOYEE_API_END_POINT}/updateEmployeeProfile/${selectedEmployeeId}`,
        input,
        {
          withCredentials: true,
        },
      );

      toast.promise(promise, {
        pending: "Updatading profile data...",
        success: "Employee data updated successfully",
        error: {
          render({ data }) {
            return (
              data?.response?.data?.message || "Employee data is not updated"
            );
          },
        },
      });

      const res = await promise;
      if (res.data.success) {
        dispatch(setSingleEmployeeData(res.data.employee));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal fade employee-info"
      id="updateProfileModal"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content custom-modal">
          {/* HEADER */}
          <div className="modal-header border-0">
            <div>
              <h5 className="modal-title fw-bold">Edit Profile</h5>
              <p className="text-muted small mb-0">Update employee details</p>
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
                          (option) => option.label === input.department,
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
                    <div className="col-12 col-md-6 col-lg-6 mb-1">
                      <label htmlFor="department">Status</label>
                      <Select
                        options={status}
                        value={status.find(
                          (option) => option.label === input.status,
                        )}
                        name="status"
                        onChange={(selectOption) =>
                          setInput({ ...input, status: selectOption.label })
                        }
                        placeholder="Select Status"
                        classNamePrefix="select-custom"
                        menuPlacement="top"
                      ></Select>
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
                      <label>Change Password</label>
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
                        value={systemRole.find(
                          (option) => option.label.toLowerCase() === input.role,
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
                    Update Employee
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

export default UpdateProfileModal;
