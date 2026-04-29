import Banner from "../../../features/home/components/Banner";
import EmployeeSignUp from "../components/EmployeeSignUp";

const EmployeeSignUpSection = () => {
  return (
    <div className="hero-section">
      <div className="row align-items-center g-0">
        <div className="col-12 col-md-12 col-lg-6 d-flex align-items-center justify-content-center bg-light">
          <Banner />
        </div>
        <div className="col-12 col-md-12 col-lg-6">
          <EmployeeSignUp />
        </div>
      </div>
    </div>
  );
};

export default EmployeeSignUpSection;
