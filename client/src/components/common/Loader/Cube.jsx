import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Cube = () => {
  const cubeRef = useRef();

  useFrame((_, delta) => {
    cubeRef.current.rotation.x += delta * 0.6;
    cubeRef.current.rotation.y += delta * 0.8;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />

      {/* Cube Material */}
      <meshStandardMaterial
        color="#000000"
        roughness={0.2}
        metalness={0.8}
        emissive="#7CFF00"
        emissiveIntensity={0.15}
      />

      {/* Neon Edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
        <lineBasicMaterial color="#7CFF00" linewidth={2} />
      </lineSegments>
    </mesh>
  );
};

export default Cube;
