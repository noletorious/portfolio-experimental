import React, { useState } from "react";
import Scene from "./components/3d/Scene";
import Overlay from "./components/ui/Overlay";
import PerformanceMonitor from "./components/ui/PerformanceMonitor";
import LoadingStatus from "./components/ui/LoadingStatus";

function App() {
  const [currentScene, setCurrentScene] = useState("portland");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ position: "relative" }}>
      {/* 3D Scene */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Scene currentScene={currentScene} />
      </div>

      {/* UI Overlay */}
      <Overlay
        currentScene={currentScene}
        onSceneChange={setCurrentScene}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Menu Button - Top Right */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 50,
          pointerEvents: "auto",
          width: "3rem",
          height: "3rem",
          fontSize: "1.25rem",
          padding: "0.25rem",
        }}
        className="rounded-full bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 backdrop-blur-xl transition-all duration-200 cursor-pointer text-white hover:text-blue-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-white/10"
      >
        {menuOpen ? "✕" : "≡"}
      </button>

      {/* Performance Monitor */}
      <PerformanceMonitor />

      {/* Loading Status Indicator */}
      <LoadingStatus />
    </div>
  );
}

export default App;
