import { createPortal } from "react-dom";
import LoaderCanvas from "./LoaderCanvas";
import "./CubeLoader.css";

const CubeLoader = () => {
  return createPortal(
    <div className="cube-loader-overlay" role="status" aria-live="polite">
      <div className="cube-loader-card">
        <LoaderCanvas />
      </div>
    </div>,
    document.body,
  );
};

export default CubeLoader;
