import { FaEdit, FaTrash } from "react-icons/fa";
const EmployeesCard = () => {
  const EmployeesCard = [1, 2, 3, 4, 5];
  return (
    <div className="row align-items-center g-4">
      {EmployeesCard.map((item, index) => {
        return (
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card user-card">
              {/* Overlay */}
              <div className="overlay">
                <button className="icon-btn edit">
                  <FaEdit />
                </button>
                <button className="icon-btn delete">
                  <FaTrash />
                </button>
              </div>
              <div className="card-header-section position-relative">
                <span className="badge bg-light text-dark department-badge">
                  Sales
                </span>

                <div className="avatar-circle">
                  <span className="initials">JT</span>
                </div>
              </div>

              <div className="card-body text-start">
                <h5 className="mb-1 fw-semibold">James Thomas</h5>
                <p className="text-muted mb-0 small">Marketing</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeesCard;
