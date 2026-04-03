import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const ParticleSystem: React.FC = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <color attach="background" args={["#000510"]} />

        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />

        <Stars
          radius={300}
          depth={60}
          count={5000}
          factor={7}
          saturation={0}
          fade
          speed={1}
        />

        <ParticleCloud />
        <CentralCore />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>
    </div>
  );
};

const ParticleCloud: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 3000;

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Create a galaxy-like spiral pattern
      const radius = Math.random() * 15 + 2;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Velocity for orbit motion
      velocities[i3] = (-Math.sin(angle) * 0.1) / radius;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.cos(angle) * 0.1) / radius;

      // Color gradient from center to edge
      const distance = radius / 15;
      const color = new THREE.Color();
      color.setHSL(0.6 - distance * 0.3, 1, 0.3 + distance * 0.4);

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors, velocities };
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array;

      // Animate particles in spiral motion
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        positions[i3] += velocities[i3] * delta * 10;
        positions[i3 + 1] += velocities[i3 + 1] * delta * 10;
        positions[i3 + 2] += velocities[i3 + 2] * delta * 10;

        // Keep particles in bounds
        const x = positions[i3];
        const z = positions[i3 + 2];
        const distance = Math.sqrt(x * x + z * z);

        if (distance > 17) {
          const angle = Math.atan2(z, x);
          positions[i3] = Math.cos(angle) * 2;
          positions[i3 + 2] = Math.sin(angle) * 2;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const CentralCore: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.2;

      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#4f46e5"
        emissiveIntensity={0.5}
        roughness={0}
        metalness={1}
      />
    </mesh>
  );
};

export default ParticleSystem;
