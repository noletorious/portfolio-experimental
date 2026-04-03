import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Text,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import * as THREE from "three";

const AnimatedBus: React.FC<{ position: [number, number, number]; speed: number }> = ({
  position,
  speed,
}) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.z += speed;
      if (meshRef.current.position.z > 15) {
        meshRef.current.position.z = -15;
      }
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[0.6, 0.4, 1]} />
        <meshStandardMaterial color="#ff9500" emissive="#ff9500" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.3, 0.15, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-0.3, 0.15, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
};

const TilikumBridge: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  return (
    <group position={position}>
      {/* Main bridge deck */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 0.3, 0.8]} />
        <meshStandardMaterial color="#d4a574" roughness={0.5} />
      </mesh>

      {/* Suspension cables */}
      {[-3, -1, 1, 3].map((x) => (
        <mesh key={x} position={[x, 1.5, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          <meshStandardMaterial color="#888" />
        </mesh>
      ))}

      {/* Bridge towers */}
      {[-3.5, 3.5].map((x) => (
        <mesh key={x} position={[x, 0.75, 0]}>
          <boxGeometry args={[0.3, 2, 0.3]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      ))}
    </group>
  );
};

const PortlandScene: React.FC = () => {
  const [weather, setWeather] = React.useState("Portland");

  useEffect(() => {
    const weatherOptions = ["Rainy", "Cloudy", "Clear", "Overcast"];
    const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
    setWeather(randomWeather);
  }, []);

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 8, 20], fov: 45 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        onCreated={(gl) => {
          gl.gl.setClearColor("#0f172a");
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 8, 20]} fov={45} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[15, 25, 10]}
          intensity={1.3}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff6b6b" />
        <pointLight position={[10, 5, 10]} intensity={0.4} color="#4ecdc4" />

        {/* Environment */}
        <Environment preset="night" />

        {/* Title with Weather */}
        <Text
          position={[0, 10, -5]}
          fontSize={1.5}
          color="#4ecdc4"
          anchorX="center"
          anchorY="middle"
        >
          {weather}
        </Text>

        {/* Ground */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
        >
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#1a2332" roughness={0.8} />
        </mesh>

        {/* Downtown Portland Buildings */}
        {[
          { x: -12, z: 5, w: 1.2, h: 6, d: 1.2, color: "#e94560" },
          { x: -8, z: 8, w: 1.5, h: 7, d: 1.3, color: "#ff6b6b" },
          { x: -4, z: 6, w: 1.3, h: 5.5, d: 1.4, color: "#f72585" },
          { x: 2, z: 7, w: 1.4, h: 6.5, d: 1.2, color: "#b5179e" },
          { x: 8, z: 5, w: 1.2, h: 5, d: 1.3, color: "#a91d3a" },
        ].map((building, idx) => (
          <mesh
            key={idx}
            position={[building.x, building.h / 2 - 1, building.z]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[building.w, building.h, building.d]} />
            <meshStandardMaterial color={building.color} roughness={0.4} />
          </mesh>
        ))}

        {/* Tilikum Bridge */}
        <TilikumBridge position={[0, 1.5, 10]} />

        {/* Animated Buses/Vehicles */}
        <AnimatedBus position={[-3, 0.5, 0]} speed={0.08} />
        <AnimatedBus position={[3, 0.5, -5]} speed={0.06} />

        {/* Floating Particle-like Cyclists/People */}
        {[
          { pos: [-6, 0.5, 3] as [number, number, number], color: "#95e1d3" },
          { pos: [4, 0.5, 2] as [number, number, number], color: "#4ecdc4" },
          { pos: [0, 0.5, 8] as [number, number, number], color: "#38b6ff" },
          { pos: [-8, 0.5, 6] as [number, number, number], color: "#00d4d4" },
        ].map((person, idx) => (
          <mesh key={idx} position={person.pos} castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={person.color}
              emissive={person.color}
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}

        {/* Floating lights (like street lamps) */}
        {[-10, -5, 0, 5, 10].map((x) => (
          <group key={x} position={[x, 3, 5]}>
            <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.8}
              />
            </mesh>
            <pointLight color="#ffff00" intensity={0.6} distance={5} />
          </group>
        ))}

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={40}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={(Math.PI * 2) / 3}
        />

        {/* Post-processing Effects */}
        <EffectComposer>
          <Bloom
            intensity={1.3}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration offset={[0.003, 0.003]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default PortlandScene;
