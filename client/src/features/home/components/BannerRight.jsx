import { FaArrowRightLong, FaUserShield, FaUsers } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BannerRight = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="banner-right">
        <h2>
          Welcome <span>Back!</span>
        </h2>
        <p>Select your portal to log in securely and get started.</p>
        <div className="btn-info">
          <div className="banner-button">
            <button
              className="banner-btn d-flex align-items-center justify-content-between"
              onClick={() => navigate("/admin/portal")}
            >
              <div className="admin-main d-flex gap-3 align-items-center justify-content-center">
                <div className="icon-info">
                  <FaUserShield className="icon-design" />
                </div>
                <div className="btn-title text-start mt-2">
                  <h6>Admin Portal</h6>
                  <p>
                    Manage system users,
                    <br /> and organization
                  </p>
                </div>
              </div>

              <div className="btn-arrow">
                <FaArrowRightLong className="mb-2 fa-arrow" />
              </div>
            </button>
          </div>
          {/* employee info */}
          <div className="banner-button">
            <button
              className="banner-btn d-flex align-items-center justify-content-between"
              onClick={() => navigate("/admin/portal")}
            >
              <div className="admin-main d-flex gap-3 align-items-center justify-content-center">
                <div className="icon-info">
                  <FaUsers className="icon-design" />
                </div>
                <div className="btn-title text-start mt-2">
                  <h6>Employee Portal</h6>
                  <p>
                    Access Your Profile,
                    <br /> attendance and more
                  </p>
                </div>
              </div>

              <div className="btn-arrow">
                <FaArrowRightLong className="mb-2 fa-arrow" />
              </div>
            </button>
          </div>
          <div className="next-info">
            <p>
              © 2026 <span>Dhirendra.</span> All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerRight;
