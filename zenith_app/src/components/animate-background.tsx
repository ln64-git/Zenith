"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { generateRelativeColors } from "@/utils/colorUtils"; // Adjust the path as necessary

interface AnimatedGrayDivProps {
  initialColor: string;
  className?: string;
  children?: React.ReactNode;
}

const AnimatedGrayDiv: React.FC<AnimatedGrayDivProps> = ({
  initialColor,
  className,
  children,
}) => {
  const controls = useAnimation();
  const colors = generateRelativeColors(initialColor);

  useEffect(() => {
    controls.start({
      backgroundColor: colors,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 10,
        ease: "easeInOut",
      },
    });
  }, [controls, colors]);

  return (
    <motion.div
      animate={controls}
      className={className}
      initial={{ backgroundColor: initialColor }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedGrayDiv;
