import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface AnimatedCubeProps {
  position: [number, number, number];
}

const AnimatedCube: React.FC<AnimatedCubeProps> = ({ position }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#3b82f6"
        roughness={0.3}
        metalness={0.8}
        emissive="#1e40af"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export default AnimatedCube;
