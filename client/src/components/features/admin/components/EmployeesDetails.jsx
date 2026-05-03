import { useState } from "react";
import Button from "../../../ui/Button";
import AddEmployeeModal from "./AddEmployeeModal";
import { CiSearch } from "react-icons/ci";
import Select from "react-select";
import EmployeesCard from "./EmployeesCard";

const EmployeesDetails = () => {
  const [department, setDepartment] = useState(null);
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
  return (
    <div className="container">
      <div className="employee-main d-flex align-items-center justify-content-between">
        <div className="employee-heading">
          <h2>Employees</h2>
          <p>Manage and add your team members</p>
        </div>
        <div>
          <Button />
        </div>
        <AddEmployeeModal />
      </div>
      <div className="employee-search">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-10 col-lg-10">
            <div className="employee-seach-input">
              <input type="text" placeholder="Search Employees..." />
              <CiSearch className="serach-icons" />
            </div>
          </div>
          <div className="col-12 col-md-2 col-lg-2">
            <div className="select-search">
              <Select
                options={options}
                value={department}
                onChange={(e) => setDepartment(e)}
                placeholder="All Department"
                classNamePrefix="select-custom"
                menuPlacement="top"
              ></Select>
            </div>
          </div>
        </div>
      </div>
      {/* employees card */}
      <div className="employee-card">
        <EmployeesCard />
      </div>
    </div>
  );
};

export default EmployeesDetails;
