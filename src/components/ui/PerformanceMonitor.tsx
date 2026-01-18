import React from "react";
import { motion } from "framer-motion";
import { usePerformance, useWebGLSupport } from "../../hooks/usePerformance";

const PerformanceMonitor: React.FC = () => {
  const { fps, memory } = usePerformance();
  const { isSupported, context } = useWebGLSupport();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto z-20"
    >
      <div className="glass rounded-lg px-4 py-2 flex items-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div
            className={`w-2 h-2 rounded-full ${
              fps >= 55
                ? "bg-green-400"
                : fps >= 30
                  ? "bg-yellow-400"
                  : "bg-red-400"
            }`}
          />
          <span className="text-gray-300">FPS:</span>
          <span className="text-white font-mono">{fps}</span>
        </div>

        {memory > 0 && (
          <div className="flex items-center space-x-1">
            <span className="text-gray-300">Memory:</span>
            <span className="text-white font-mono">{memory.toFixed(1)}MB</span>
          </div>
        )}

        <div className="flex items-center space-x-1">
          <div
            className={`w-2 h-2 rounded-full ${
              isSupported ? "bg-green-400" : "bg-red-400"
            }`}
          />
          <span className="text-gray-300">WebGL:</span>
          <span className="text-white font-mono">{context || "None"}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMonitor;
