import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateProfileModal from "./UpdateProdileModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmployee,
  setSelectedEmployeeId,
} from "../../../../redux/employeeSlice";
import axios from "axios";
import { EMPLOYEE_API_END_POINT } from "../../../../utils/constantUrl";
import { toast } from "react-toastify";
const EmployeesCard = () => {
  const { employee, searchText, searchDepartment } = useSelector(
    (store) => store.employee,
  );

  const filterEmployee = employee.filter((emp) => {
    const matchSearch =
      emp?.firstName?.toUpperCase().includes(searchText.toUpperCase()) ||
      emp?.email?.toUpperCase().includes(searchText.toUpperCase());

    const matchDepartment = searchDepartment
      ? emp.department === searchDepartment.label
      : true;
    console.log("department", matchDepartment);

    return matchSearch && matchDepartment;
  });

  const dispatch = useDispatch();
  const handleEdit = (id) => {
    dispatch(setSelectedEmployeeId(id));
  };

  const handleDelete = async (id) => {
    console.log("id", id);

    try {
      const promise = axios.delete(
        `${EMPLOYEE_API_END_POINT}/deleteEmployeeById/${id}`,
        {
          withCredentials: true,
        },
      );

      toast.promise(promise, {
        pending: "Deleting...",
        success: "Employee deleted successed",
        error: {
          render({ data }) {
            return (
              data?.response?.data?.message || "Something is wrong to delete"
            );
          },
        },
      });

      const res = await promise;
      if (res.data.success) {
        const updateEmployee = employee.filter((item) => item._id !== id);
        console.log("Before:", employee.length);
        console.log("After:", updateEmployee.length);
        dispatch(setEmployee(updateEmployee));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="row align-items-center g-4">
        {filterEmployee?.map((item, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-3" key={item?._id}>
              <div className="card user-card">
                {/* Overlay */}
                <div className="overlay">
                  <button
                    className="icon-btn edit"
                    data-bs-toggle="modal"
                    data-bs-target="#updateProfileModal"
                    onClick={() => handleEdit(item?._id)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    type="button"
                    className="icon-btn delete"
                    onClick={() => {
                      const ok = window.confirm(
                        "Are you sure you want to delete this item?",
                      );
                      if (ok) {
                        handleDelete(item?._id);
                      }
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="card-header-section position-relative">
                  <span className="badge bg-light text-dark department-badge">
                    {item.department}
                  </span>

                  <div className="avatar-circle">
                    <span className="initials">
                      {item.firstName[0] + item.lastName[0].toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="card-body text-start">
                  <h5 className="mb-1 fw-semibold">
                    {`${item.firstName} ${item.lastName}`}
                  </h5>
                  <p className="text-muted mb-0 small">{item.position}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <UpdateProfileModal />
    </>
  );
};

export default EmployeesCard;
