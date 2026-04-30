import Button from "../../../ui/Button";
import AddEmployeeModal from "./AddEmployeeModal";

const EmployeesDetails = () => {
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
    </div>
  );
};

export default EmployeesDetails;
