"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number; // positive values move slower, negative values move faster
  direction?: "vertical" | "horizontal" | "both";
  className?: string;
  containerClassName?: string;
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  direction = "vertical",
  className = "",
  containerClassName = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  // Initialize element position measurements
  useEffect(() => {
    if (!ref.current) return;

    const setValues = () => {
      setElementTop(ref.current?.offsetTop || 0);
      setElementHeight(ref.current?.offsetHeight || 0);
      setClientHeight(window.innerHeight);
    };

    setValues();
    window.addEventListener("resize", setValues);

    return () => window.removeEventListener("resize", setValues);
  }, []);

  const { scrollY } = useScroll();

  // Calculate parallax ranges based on element position
  const initialOffsetY = 0;

  // Adjust these ranges according to element position and desired parallax effect
  const yRange = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + elementHeight],
    [initialOffsetY - speed * 100, initialOffsetY + speed * 100]
  );

  // For horizontal movement if needed
  const xRange = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + elementHeight],
    [initialOffsetY - speed * 50, initialOffsetY + speed * 50]
  );

  // Set transform values based on direction
  const transformValues = {
    y: direction === "horizontal" ? 0 : yRange,
    x: direction === "vertical" ? 0 : direction === "both" ? xRange : 0,
  };

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <motion.div
        style={transformValues}
        className={`parallax ${className}`}
        transition={{ type: "tween", ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Simplified version that just applies a basic parallax effect
export const SimpleParallax: React.FC<{
  children: React.ReactNode;
  className?: string;
  offset?: number;
}> = ({ children, className = "", offset = 50 }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div
      style={{ y }}
      className={`parallax ${className}`}
      transition={{ type: "tween", ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
