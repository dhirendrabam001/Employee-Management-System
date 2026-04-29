import Banner from "../../../features/home/components/Banner";
import VerifyAccount from "../components/VerifyAccount";

const VerifyAccountSection = () => {
  return (
    <div className="verify-section">
      <div className="row w-100 align-items-center m-0">
        <div className="col-12 col-md-12 col-lg-6 d-flex align-items-center justify-content-center bg-light d-none d-md-block">
          <Banner />
        </div>
        <div className="col-12 col-md-12 col-lg-6">
          <VerifyAccount />
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountSection;
