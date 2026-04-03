import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OverlayProps {
  currentScene: string;
  onSceneChange: (scene: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const scenes = [
  { id: "portland", name: "Portland Live", description: "Home" },
  { id: "geometry", name: "Cosmic Art", description: "Animated shapes" },
  { id: "particles", name: "Particle Galaxy", description: "Advanced effects" },
  { id: "main", name: "3D Showcase", description: "Interactive scene" },
];

const Overlay: React.FC<OverlayProps> = ({
  currentScene,
  onSceneChange,
  menuOpen,
  setMenuOpen,
}) => {
  const handleSceneChange = (sceneId: string) => {
    onSceneChange(sceneId);
    setMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Route Buttons Popup */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 pointer-events-auto"
            />

            {/* Routes Grid - Next to Menu Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 right-8 pointer-events-auto"
            >
              <div className="grid grid-cols-2 gap-3 p-5 bg-black/60 backdrop-blur-xl border-4 border-cyan-400 rounded-none"
                style={{
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.5), inset 0 0 10px rgba(34, 211, 238, 0.2)"
                }}
              >
                {scenes.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => handleSceneChange(scene.id)}
                    className={`p-4 cursor-pointer transition-all text-center border-4 ${
                      currentScene === scene.id
                        ? "bg-cyan-500/60 border-cyan-300 text-white"
                        : "bg-purple-600/50 border-pink-400 text-white hover:bg-purple-500/70"
                    }`}
                    style={{
                      fontFamily: "'Press Start 2P', cursive",
                      fontSize: "0.5rem",
                      boxShadow: currentScene === scene.id
                        ? "0 0 15px rgba(34, 211, 238, 0.8), inset 2px 2px 0 rgba(255, 255, 255, 0.3)"
                        : "0 0 10px rgba(168, 85, 247, 0.6), inset 2px 2px 0 rgba(255, 255, 255, 0.2)",
                      transform: currentScene === scene.id ? "scale(1.05)" : "scale(1)",
                      textShadow: "0 0 10px rgba(255, 255, 255, 0.8)"
                    }}
                  >
                    <div>{scene.name}</div>
                    <div style={{
                      fontSize: "0.35rem",
                      marginTop: "0.5rem",
                      opacity: 0.8
                    }}>
                      {scene.description}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Overlay;
