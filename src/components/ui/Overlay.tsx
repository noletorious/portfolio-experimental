import React from "react";
import { motion } from "framer-motion";

interface OverlayProps {
  currentScene: string;
  onSceneChange: (scene: string) => void;
}

const scenes = [
  { id: "main", name: "Main Scene", description: "Interactive 3D showcase" },
  {
    id: "particles",
    name: "Particle System",
    description: "Advanced particle effects",
  },
  {
    id: "geometry",
    name: "Geometric Art",
    description: "Animated geometric shapes",
  },
];

const Overlay: React.FC<OverlayProps> = ({ currentScene, onSceneChange }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-6 left-6 pointer-events-auto"
      >
        <div className="glass rounded-lg p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            3D Portfolio
          </h1>
          <p className="text-sm text-gray-300 mt-1">Interactive Experience</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute top-6 right-6 pointer-events-auto"
      >
        <div className="glass rounded-lg p-4 space-y-2">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Scenes</h3>
          {scenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSceneChange(scene.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                currentScene === scene.id
                  ? "bg-blue-500/20 border border-blue-400/30 text-blue-300"
                  : "hover:bg-white/10 text-gray-300 hover:text-white"
              }`}
            >
              <div className="text-sm font-medium">{scene.name}</div>
              <div className="text-xs text-gray-400">{scene.description}</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Info Panel */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="absolute bottom-6 left-6 pointer-events-auto"
      >
        <div className="glass rounded-lg p-4 max-w-md">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Controls</h3>
          <div className="space-y-1 text-xs text-gray-400">
            <div>
              • <span className="text-white">Left Click + Drag:</span> Rotate
              camera
            </div>
            <div>
              • <span className="text-white">Scroll:</span> Zoom in/out
            </div>
            <div>
              • <span className="text-white">Right Panel:</span> Switch scenes
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tech Stack Badge */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        className="absolute bottom-6 right-6 pointer-events-auto"
      >
        <div className="glass rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Built with</div>
          <div className="flex flex-wrap gap-1">
            {["React", "Three.js", "TypeScript", "Vite"].map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded border border-blue-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Overlay;
