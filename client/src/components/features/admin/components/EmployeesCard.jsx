import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateProfileModal from "./UpdateProdileModal";
import { useDispatch, useSelector } from "react-redux";
const EmployeesCard = () => {
  const { employee } = useSelector((store) => store.employee);
  return (
    <>
      <div className="row align-items-center g-4">
        {employee?.map((item, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-3" key={item?._id}>
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
                    <span className="initials">
                      {item.firstName[0] + item.lastName[0].toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="card-body text-start">
                  <h5 className="mb-1 fw-semibold">{item.firstName}</h5>
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
