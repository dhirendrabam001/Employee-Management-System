// components/common/Loader.jsx

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="cube-scene">
        <div className="cube">
          <div className="cube-face cube-top"></div>
          <div className="cube-face cube-left"></div>
          <div className="cube-face cube-right"></div>
        </div>

        <div className="cube-shadow"></div>
      </div>
    </div>
  );
};

export default Loader;
