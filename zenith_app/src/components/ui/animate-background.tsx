// animated-background.tsx
"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useDisplayStore } from "@/utils/display-store";
import { generateRelativeColors } from "@/utils/colorUtils";

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className,
  children,
}) => {
  const store = useDisplayStore();
  const controls = useAnimation();
  const colors = generateRelativeColors(store.userColor);

  useEffect(() => {
    controls.start({
      backgroundColor: colors,
      boxShadow: colors.map((color) => `0 1px 15px 0 ${color}`), // Reduced intensity
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 20,
      },
    });
  }, [controls, colors]);

  return (
    <motion.div
      className=" rounded-lg relative"
      animate={controls}
      initial={{
        backgroundColor: store.userColor,
        boxShadow: `0 1px 32px 0 ${store.userColor}`,
      }}
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <motion.div
        animate={controls}
        className={className}
        initial={{ backgroundColor: store.userColor }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedBackground;
