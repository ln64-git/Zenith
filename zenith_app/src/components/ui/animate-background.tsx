// animated-background.tsx
"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { generateRelativeColors } from "@/utils/colorUtils";

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  color: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className,
  children,
  color,
}) => {
  const colors = generateRelativeColors(color);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      backgroundColor: colors,
      boxShadow: colors.map((color) => `0 1px 15px 0 ${color}`),
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 5,
      },
    });
  }, [controls, colors]);

  return (
    <motion.div
      className={`rounded-lg relative ${className}`}
      animate={controls}
      initial={{
        backgroundColor: color,
        boxShadow: `0 1px 32px 0 ${color}`,
      }}
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBackground;
