import React, { useEffect, useRef, useState } from "react";
import { prepare, layout } from "@chenglou/pretext";

interface AsciiArtSceneProps {
  imageUrl?: string;
}

const AsciiArtScene: React.FC<AsciiArtSceneProps> = ({
  imageUrl = "https://picsum.photos/640/480?random=1",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [asciiArt, setAsciiArt] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const ASCII_CHARS = "@%#*+=-:. ";
  const DENSITY = 0.15; // Scale factor for ASCII art width

  useEffect(() => {
    const generateAsciiArt = async () => {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          // Set canvas size based on image
          const maxWidth = Math.floor(window.innerWidth * DENSITY);
          const maxHeight = Math.floor(window.innerHeight * DENSITY);

          const imgAspectRatio = img.width / img.height;
          let width = maxWidth;
          let height = Math.round(width / imgAspectRatio);

          if (height > maxHeight) {
            height = maxHeight;
            width = Math.round(height * imgAspectRatio);
          }

          canvas.width = width;
          canvas.height = height;

          // Draw and process image
          ctx.drawImage(img, 0, 0, width, height);
          const imageData = ctx.getImageData(0, 0, width, height);
          const data = imageData.data;

          let ascii = "";

          // Convert pixels to ASCII
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Calculate luminance
            const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
            const charIndex = Math.floor(
              (brightness / 255) * (ASCII_CHARS.length - 1)
            );

            ascii += ASCII_CHARS[charIndex];

            // Add newline every 'width' characters
            if ((i / 4 + 1) % width === 0) {
              ascii += "\n";
            }
          }

          // Use Pretext.js for efficient text layout
          try {
            const handle = prepare(ascii, '12px "Courier New"');

            // Get the container width to layout text appropriately
            if (containerRef.current) {
              const containerWidth = containerRef.current.clientWidth;
              const { height: textHeight } = layout(
                handle,
                containerWidth,
                14
              );

              // Log layout info for debugging
              console.log("ASCII Art generated:", {
                characters: ascii.length,
                lines: ascii.split("\n").length,
                textHeight,
              });
            }
          } catch (error) {
            console.warn("Pretext.js layout calculation:", error);
          }

          setAsciiArt(ascii);
          setLoading(false);
        };

        img.onerror = () => {
          console.error("Failed to load image");
          setLoading(false);
        };

        img.src = imageUrl;
      } catch (error) {
        console.error("Error generating ASCII art:", error);
        setLoading(false);
      }
    };

    generateAsciiArt();
  }, [imageUrl]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-auto bg-black p-4 flex flex-col"
    >
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* ASCII Art Display */}
      <div className="flex-1 flex flex-col">
        {loading && (
          <div className="flex items-center justify-center h-full text-cyan-400 font-mono text-lg">
            Generating ASCII art...
          </div>
        )}

        {!loading && asciiArt && (
          <pre
            className="font-mono text-xs leading-tight text-green-400 whitespace-pre overflow-auto flex-1"
            style={{
              fontFamily: '"Courier New", monospace',
              fontSize: "10px",
              lineHeight: "1.2",
              textShadow: "0 0 10px rgba(34, 211, 238, 0.5)",
            }}
          >
            {asciiArt}
          </pre>
        )}

        {!loading && !asciiArt && (
          <div className="flex items-center justify-center h-full text-red-400 font-mono">
            Failed to generate ASCII art
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div
        className="mt-4 p-3 bg-black/70 border-2 border-cyan-400 rounded text-cyan-400 font-mono text-xs"
        style={{
          boxShadow: "0 0 10px rgba(34, 211, 238, 0.3)",
        }}
      >
        <div className="mb-2">📊 ASCII Art Renderer with Pretext.js Text Layout</div>
        <div className="text-gray-400">
          • Characters rendered: {asciiArt.length.toLocaleString()}
        </div>
        <div className="text-gray-400">
          • Lines generated: {asciiArt.split("\n").length}
        </div>
        <div className="text-gray-400">
          • Using @chenglou/pretext for efficient text measurement
        </div>
      </div>
    </div>
  );
};

export default AsciiArtScene;
