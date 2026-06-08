import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "./Cube";

export default function LoaderCanvas() {
  return (
    <Canvas
      camera={{ position: [4, 4, 4], fov: 45 }}
      style={{ height: "100vh", background: "#0b0f14" }}
    >
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7CFF00" />

      {/* Cube */}
      <Cube />

      {/* Optional controls (disable zoom for loader) */}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
