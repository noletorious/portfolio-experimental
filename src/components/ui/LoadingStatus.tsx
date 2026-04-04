import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { prepare, layout } from "@chenglou/pretext";

interface LoadingStatusProps {
  message?: string;
  spinnerType?: keyof typeof ASCII_SPINNERS;
  visible?: boolean;
}

// ASCII spinner frames
const ASCII_SPINNERS = {
  dots: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  line: ["-", "\\", "|", "/"],
  dots2: ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"],
  dots3: ["⠋", "⠙", "⠚", "⠞", "⠖", "⠦", "⠴", "⠲", "⠳", "⠓"],
  dots4: ["⠄", "⠆", "⠇", "⠋", "⠙", "⠸", "⠰", "⠠", "⠰", "⠸", "⠙", "⠋", "⠇", "⠆"],
  dots5: ["⠋", "⠙", "⠚", "⠒", "⠂", "⠂", "⠒", "⠲", "⠴", "⠦", "⠖", "⠒", "⠐", "⠐", "⠒", "⠓", "⠋"],
  dots6: ["⠁", "⠉", "⠙", "⠚", "⠒", "⠂", "⠂", "⠒", "⠲", "⠴", "⠤", "⠄", "⠄", "⠤", "⠴", "⠲", "⠒", "⠂", "⠂", "⠒", "⠚", "⠙", "⠉", "⠁"],
  dots7: ["⠈", "⠉", "⠋", "⠓", "⠒", "⠐", "⠐", "⠒", "⠖", "⠦", "⠤", "⠠", "⠠", "⠤", "⠦", "⠖", "⠒", "⠐", "⠐", "⠒", "⠓", "⠋", "⠉", "⠈"],
  dots8: ["⠁", "⠁", "⠉", "⠙", "⠚", "⠒", "⠂", "⠂", "⠒", "⠲", "⠴", "⠤", "⠄", "⠄", "⠤", "⠠", "⠠", "⠤", "⠦", "⠖", "⠒", "⠐", "⠐", "⠒", "⠓", "⠋", "⠉", "⠈", "⠈"],
  dots9: ["⢹", "⢺", "⢼", "⣸", "⣇", "⡧", "⡗", "⡏"],
  dots10: ["⢄", "⢂", "⢁", "⡁", "⡈", "⡐", "⡠"],
  dots11: ["⠁", "⠂", "⠄", "⡀", "⢀", "⠠", "⠐", "⠈"],
  dots12: ["⢀⠀", "⠄⠀", "⠂⠀", "⠁⠀", "⠁⠀", "⠂⠀", "⠄⠀", "⡀⠀"],
  line2: ["⠂", "-", "–", "—", "–", "-"],
  pipe: ["┤", "┘", "┴", "└", "├", "┌", "┬", "┐"],
  simpleDots: ["⠋", "⠙", "⠚", "⠒", "⠂", "⠂", "⠒", "⠲", "⠴", "⠦", "⠖", "⠒", "⠐", "⠐", "⠒", "⠓", "⠋"],
  simpleArc: ["◜", "◠", "◝", "◞", "◡", "◟"],
  circle: ["◡", "⊙", "◠"],
  square: ["◰", "◳", "◲", "◱"],
  triangle: ["◢", "◣", "◤", "◥"],
  arrows: ["←", "↖", "↑", "↗", "→", "↘", "↓", "↙"],
  arrowsAlt: ["⬾", "⬿", "⬽"],
  bouncingBar: ["[    ]", "[=   ]", "[==  ]", "[=== ]", "[ ===]", "[  ==]", "[   =]", "[    ]"],
  bouncingBall: ["( ●    )", "(  ●   )", "(   ●  )", "(    ● )", "(     ●)", "(    ● )", "(   ●  )", "(  ●   )", "( ●    )", "(●     )"],
  star: ["✶", "✸", "✹", "✺", "✻", "✼"],
  star2: ["⭐", "✨", "🌟"],
  flip: ["___", "---", "___"],
  hamburger: ["☱", "☲", "☴"],
  growVertical: ["▁", "▃", "▄", "▅", "▆", "▇", "▆", "▅", "▄", "▃"],
  growHorizontal: ["▏", "▎", "▍", "▌", "▋", "▊", "▉", "▊", "▋", "▌", "▍", "▎"],
  balloon: [".", "o", "O", "@", "*"],
  balloon2: [".", "o", "O"],
  noise: ["▓", "▒", "░"],
  bark: ["▐⠂       ▌", "▐⠈       ▌", "▐ ⠂      ▌", "▐ ⠠      ▌", "▐  ⡀     ▌", "▐  ⠠     ▌", "▐   ⠂    ▌", "▐   ⠈    ▌", "▐    ⠂   ▌", "▐    ⠠   ▌", "▐     ⡀  ▌", "▐     ⠠  ▌", "▐      ⠂ ▌", "▐      ⠈ ▌", "▐       ⠂▌", "▐       ⠠▌", "▐       ⡀▌"],
  dqpb: ["d", "q", "p", "b"],
  hearts: ["💛", "💙", "💜", "💚", "❤️"],
  clock: ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛"],
  moon: ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"],
};

const LoadingStatus: React.FC<LoadingStatusProps> = ({
  message = "Deliberating",
  spinnerType = "dots",
  visible = true,
}) => {
  const [displayText, setDisplayText] = useState(message);
  const [spinnerIndex, setSpinnerIndex] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const spinner = ASCII_SPINNERS[spinnerType];

  // Animate spinner frames
  useEffect(() => {
    const spinnerInterval = setInterval(() => {
      setSpinnerIndex((prev) => (prev + 1) % spinner.length);
    }, 80);

    return () => clearInterval(spinnerInterval);
  }, [spinner.length]);

  // Use Pretext.js to measure text for responsive positioning
  useEffect(() => {
    try {
      const handle = prepare(displayText, '16px "Press Start 2P"');

      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth * 0.8; // 80% of container
        const { height: textHeight } = layout(handle, containerWidth, 24);

        // Calculate approximate text width (monospace assumption)
        const approxCharWidth = 10; // Approximate width per character in pixels
        const calculatedWidth = displayText.length * approxCharWidth;
        setTextWidth(Math.min(calculatedWidth, containerWidth));
      }
    } catch (error) {
      console.warn("Pretext measurement:", error);
      setTextWidth(displayText.length * 10);
    }
  }, [displayText]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 left-8 z-30 flex items-center gap-4"
      style={{
        fontFamily: "'Press Start 2P', cursive",
      }}
    >
      {/* ASCII Spinner */}
      <div
        className="text-2xl text-cyan-300"
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: "1.5rem",
          textShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
          width: "1.5rem",
          height: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {spinner[spinnerIndex]}
      </div>

      {/* Text container with backdrop */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div
          className="absolute inset-0 bg-cyan-400/20 blur-lg rounded"
          style={{
            width: textWidth + 20,
          }}
        />
        <div
          className="relative px-3 py-2 border-2 border-cyan-400 rounded text-cyan-300 text-sm whitespace-nowrap"
          style={{
            boxShadow: "0 0 15px rgba(34, 211, 238, 0.6), inset 0 0 10px rgba(34, 211, 238, 0.2)",
            textShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "0.6rem",
            letterSpacing: "2px",
          }}
        >
          {displayText}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingStatus;
