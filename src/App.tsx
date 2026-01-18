import React, { useState } from "react";
import Scene from "./components/3d/Scene";
import Overlay from "./components/ui/Overlay";
import PerformanceMonitor from "./components/ui/PerformanceMonitor";

function App() {
  const [currentScene, setCurrentScene] = useState("main");

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* 3D Scene */}
      <Scene currentScene={currentScene} />

      {/* UI Overlay */}
      <Overlay currentScene={currentScene} onSceneChange={setCurrentScene} />

      {/* Performance Monitor */}
      <PerformanceMonitor />
    </div>
  );
}

export default App;
