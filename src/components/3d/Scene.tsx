import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import AnimatedCube from "./AnimatedCube";
import FloatingSphere from "./FloatingSphere";
import ParticleField from "./ParticleField";
import GeometricArt from "./GeometricArt";
import ParticleSystem from "./ParticleSystem";

interface SceneProps {
  currentScene: string;
}

const Scene: React.FC<SceneProps> = ({ currentScene }) => {
  const renderScene = () => {
    switch (currentScene) {
      case "particles":
        return <ParticleSystem />;
      case "geometry":
        return <GeometricArt />;
      default:
        return <MainScene />;
    }
  };

  return renderScene();
};

const MainScene: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        onCreated={(gl) => {
          gl.gl.setClearColor("#000000");
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />

        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#3b82f6"
        />
        <pointLight position={[10, -10, 10]} intensity={0.5} color="#8b5cf6" />

        {/* Environment */}
        <Environment preset="night" />

        {/* 3D Objects */}
        <AnimatedCube position={[-2, 0, 0]} />
        <FloatingSphere position={[2, 0, 0]} />
        <ParticleField />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
        />

        {/* Post-processing Effects */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Scene;
