"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FloatingElement {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

interface FloatingElementsProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
  color?: string;
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 8,
  minSize = 40,
  maxSize = 120,
  className = "",
  color = "rgba(44, 161, 95, 0.1)",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Generate random elements
  useEffect(() => {
    if (!containerRef.current) return;

    const { offsetWidth, offsetHeight } = containerRef.current;
    setDimensions({ width: offsetWidth, height: offsetHeight });

    const newElements: FloatingElement[] = [];
    for (let i = 0; i < count; i++) {
      newElements.push({
        id: i,
        size: Math.random() * (maxSize - minSize) + minSize,
        x: Math.random() * offsetWidth,
        y: Math.random() * offsetHeight,
        duration: Math.random() * 10 + 15, // 15-25 seconds
        delay: Math.random() * -20, // Negative delay to start at different points in the animation
      });
    }
    setElements(newElements);
  }, [count, minSize, maxSize]);

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full floating-element opacity-30"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
            background: color,
          }}
          animate={{
            x: [
              0,
              Math.random() * 60 - 30,
              Math.random() * 60 - 30,
              Math.random() * 60 - 30,
              0,
            ],
            y: [
              0,
              Math.random() * 60 - 30,
              Math.random() * 60 - 30,
              Math.random() * 60 - 30,
              0,
            ],
            scale: [1, 1.1, 1.05, 1.1, 1],
            rotate: [0, Math.random() * 20 - 10, 0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: el.duration,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Infinity,
            delay: el.delay,
          }}
        />
      ))}
    </div>
  );
};
