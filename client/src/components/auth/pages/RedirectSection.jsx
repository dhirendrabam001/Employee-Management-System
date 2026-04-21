import Banner from "../../../features/home/components/Banner";
import Redirect from "../components/Redirect";

const RedirectSection = () => {
  return (
    <div className="hero-section">
      <div className="row align-items-center g-0 h-100">
        <div className="col-12 col-md-6 col-lg-6 d-flex align-items-center justify-content-center bg-light">
          <Banner />
        </div>
        <div className="col-12 col-md-6 col-lg-6 d-none d-md-block">
          <Redirect />
        </div>
      </div>
    </div>
  );
};

export default RedirectSection;
