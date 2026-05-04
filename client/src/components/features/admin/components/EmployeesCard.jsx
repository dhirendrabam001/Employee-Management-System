import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateProfileModal from "./UpdateProdileModal";
const EmployeesCard = () => {
  const Employees = [
    {
      id: 1,
      name: "James Thomas",
      department: "Sales",
      role: "Marketing",
      initials: "JT",
    },
    {
      id: 2,
      name: "Sophia Brown",
      department: "HR",
      role: "Recruiter",
      initials: "SB",
    },
    {
      id: 3,
      name: "Michael Lee",
      department: "IT",
      role: "Frontend Dev",
      initials: "ML",
    },
    {
      id: 4,
      name: "Emma Wilson",
      department: "Finance",
      role: "Accountant",
      initials: "EW",
    },
    {
      id: 5,
      name: "Daniel Clark",
      department: "Operations",
      role: "Manager",
      initials: "DC",
    },
    {
      id: 6,
      name: "Olivia Martin",
      department: "Design",
      role: "UI Designer",
      initials: "OM",
    },
  ];
  return (
    <>
      <div className="row align-items-center g-4">
        {Employees.map((item, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-3" key={item.id}>
              <div className="card user-card">
                {/* Overlay */}
                <div className="overlay">
                  <button
                    className="icon-btn edit"
                    data-bs-toggle="modal"
                    data-bs-target="#updateProfileModal"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="icon-btn delete"
                    onClick={() => {
                      const ok = window.alert(
                        "Are you sure you want to delete this item?",
                      );
                      if (ok) {
                        handleDelete();
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
                    <span className="initials">{item.initials}</span>
                  </div>
                </div>

                <div className="card-body text-start">
                  <h5 className="mb-1 fw-semibold">{item.name}</h5>
                  <p className="text-muted mb-0 small">{item.role}</p>
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
