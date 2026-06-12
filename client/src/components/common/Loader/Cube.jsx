import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CUBE_SIZE = 1.15;

const Cube = () => {
  const cubeRef = useRef();
  const edgesGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE)),
    [],
  );

  useFrame((_, delta) => {
    cubeRef.current.rotation.x += delta * 0.65;
    cubeRef.current.rotation.y += delta * 0.85;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      <meshStandardMaterial
        color="#050c1f"
        roughness={0.35}
        metalness={0.55}
        emissive="#4338ca"
        emissiveIntensity={0.22}
      />
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#6366f1" />
      </lineSegments>
    </mesh>
  );
};

export default Cube;
