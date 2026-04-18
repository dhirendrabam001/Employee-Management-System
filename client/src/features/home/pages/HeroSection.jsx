import Banner from "../components/Banner";
import BannerRight from "../components/BannerRight";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="row align-items-center g-0 h-100">
        <div className="col-12 col-md-6 col-lg-6 d-flex align-items-center justify-content-center bg-light">
          <Banner />
        </div>
        <div className="col-12 col-md-6 col-lg-6 d-none d-md-block">
          <BannerRight />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
