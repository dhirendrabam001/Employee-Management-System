// components/common/Loader.jsx

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="cube-container">
        <div className="cube">
          <div className="cube-face cube-front"></div>
          <div className="cube-face cube-back"></div>
          <div className="cube-face cube-top"></div>
          <div className="cube-face cube-bottom"></div>
          <div className="cube-face cube-left"></div>
          <div className="cube-face cube-right"></div>
        </div>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;
