"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { generateRelativeColors } from "@/utils/color-utils";

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
      boxShadow: colors.map((color) => `0 1px 15px 0 ${color}`), // Reduced intensity
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 5,
      },
    });
  }, [controls, colors]);

  return (
    <motion.div
      className=" rounded-lg relative"
      animate={controls}
      initial={{
        backgroundColor: initialColor,
        boxShadow: `0 1px 32px 0 ${initialColor}`,
      }}
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <motion.div
        animate={controls}
        className={className}
        initial={{ backgroundColor: initialColor }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedGrayDiv;
