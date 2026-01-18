export interface Scene {
  id: string;
  name: string;
  description: string;
  component: string;
}

export interface PerformanceMetrics {
  fps: number;
  memory: number;
  drawCalls?: number;
  triangles?: number;
}

export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface LightingConfig {
  ambient: {
    intensity: number;
    color: string;
  };
  directional: {
    intensity: number;
    position: [number, number, number];
    color: string;
    castShadow: boolean;
  };
  point: Array<{
    intensity: number;
    position: [number, number, number];
    color: string;
  }>;
}

export interface AnimationState {
  isPlaying: boolean;
  speed: number;
  time: number;
}
