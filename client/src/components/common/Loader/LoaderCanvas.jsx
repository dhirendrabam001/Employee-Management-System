import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";

const LoaderCanvas = () => {
  return (
    <Canvas
      className="cube-loader-canvas"
      camera={{ position: [2.6, 2.6, 2.6], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 4, 4]} intensity={0.9} color="#e0e7ff" />
      <pointLight position={[-3, -2, -3]} intensity={0.45} color="#6366f1" />
      <pointLight position={[2, 2, 2]} intensity={0.35} color="#818cf8" />
      <Cube />
    </Canvas>
  );
};

export default LoaderCanvas;
