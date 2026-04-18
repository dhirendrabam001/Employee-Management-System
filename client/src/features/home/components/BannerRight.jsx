import { FaArrowRightLong } from "react-icons/fa6";
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
              <div className="btn-title">
                <h6>Admin Portal</h6>
              </div>
              <div className="btn-arrow">
                <FaArrowRightLong className="mb-2 fa-arrow" />
              </div>
            </button>
          </div>
          <div className="banner-button">
            <button className="banner-btn d-flex align-items-center justify-content-between">
              <div className="btn-title">
                <h6>Employee Portal</h6>
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
