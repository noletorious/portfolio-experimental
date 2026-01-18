import { useEffect, useState } from "react";

/**
 * Custom hook to track performance metrics
 * Useful for monitoring frame rate and optimization
 */
export const usePerformance = () => {
  const [fps, setFps] = useState<number>(60);
  const [memory, setMemory] = useState<number>(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const updateMetrics = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;

        // Memory usage (if available)
        if ("memory" in performance) {
          setMemory((performance as any).memory.usedJSHeapSize / 1048576); // MB
        }
      }

      animationId = requestAnimationFrame(updateMetrics);
    };

    animationId = requestAnimationFrame(updateMetrics);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return { fps, memory };
};

/**
 * Custom hook for responsive design breakpoints
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  );

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint("mobile");
      } else if (width < 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);

    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, []);

  return breakpoint;
};

/**
 * Custom hook for WebGL capability detection
 */
export const useWebGLSupport = () => {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [context, setContext] = useState<"webgl" | "webgl2" | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;

    try {
      gl = canvas.getContext("webgl2");
      if (gl) {
        setContext("webgl2");
        setIsSupported(true);
      } else {
        gl = canvas.getContext("webgl");
        if (gl) {
          setContext("webgl");
          setIsSupported(true);
        } else {
          setIsSupported(false);
        }
      }
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  return { isSupported, context };
};
