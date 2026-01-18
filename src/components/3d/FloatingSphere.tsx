import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface FloatingSphereProps {
  position: [number, number, number];
}

const FloatingSphere: React.FC<FloatingSphereProps> = ({ position }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.4;
      meshRef.current.position.y =
        Math.cos(state.clock.elapsedTime * 0.8) * 0.5;
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.1,
      );
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#8b5cf6"
        roughness={0.1}
        metalness={0.9}
        emissive="#7c3aed"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

export default FloatingSphere;
