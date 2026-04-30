import { FaPlus } from "react-icons/fa6";
const Button = () => {
  return (
    <button
      className="employee-add-btn d-flex align-items-center gap-2"
      data-bs-toggle="modal"
      data-bs-target="#addEmployeeModal"
    >
      <FaPlus />
      Add Employee
    </button>
  );
};

export default Button;
