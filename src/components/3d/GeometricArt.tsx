import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const GeometricArt: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6b" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4ecdc4" />

        <GeometricShapes />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

const GeometricShapes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const shapes = useMemo(() => {
    const geometries = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 2;

      geometries.push({
        position: [x, y, z] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: Math.random() * 0.5 + 0.5,
        color: new THREE.Color().setHSL(i / count, 0.8, 0.6),
        type: Math.floor(Math.random() * 3), // 0: box, 1: sphere, 2: pyramid
      });
    }

    return geometries;
  }, []);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => (
        <GeometricShape key={index} {...shape} index={index} />
      ))}
    </group>
  );
};

interface GeometricShapeProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: THREE.Color;
  type: number;
  index: number;
}

const GeometricShape: React.FC<GeometricShapeProps> = ({
  position,
  rotation,
  scale,
  color,
  type,
  index,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1);
      meshRef.current.rotation.y += 0.01 * (index % 3 === 0 ? 1 : -1);
      meshRef.current.position.y +=
        Math.sin(state.clock.elapsedTime + index) * 0.002;
    }
  });

  const renderGeometry = () => {
    switch (type) {
      case 0:
        return <boxGeometry args={[1, 1, 1]} />;
      case 1:
        return <sphereGeometry args={[0.5, 16, 16]} />;
      case 2:
        return <coneGeometry args={[0.5, 1, 4]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    >
      {renderGeometry()}
      <MeshDistortMaterial
        color={color}
        distort={0.2}
        speed={2}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
};

export default GeometricArt;
