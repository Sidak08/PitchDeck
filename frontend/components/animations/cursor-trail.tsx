"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorTrailProps {
  color?: string;
  size?: number;
  trailLength?: number;
  trailColor?: string;
  trailFadeOut?: boolean;
  smoothFactor?: number;
  enabled?: boolean;
}

export const CursorTrail: React.FC<CursorTrailProps> = ({
  color = "rgba(44, 161, 95, 0.8)",
  size = 10,
  trailLength = 8,
  trailColor = "rgba(44, 161, 95, 0.4)",
  trailFadeOut = true,
  smoothFactor = 0.2,
  enabled = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [trailDots, setTrailDots] = useState<Array<{ x: number; y: number }>>([]);

  // Use motion values for smooth cursor movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics for smooth following
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!enabled) return;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Update trail positions
      setTrailDots((prevDots) => {
        // Add current position to the beginning
        const newDots = [{ x: e.clientX, y: e.clientY }, ...prevDots];
        // Limit trail length
        return newDots.slice(0, trailLength);
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled, mouseX, mouseY, trailLength]);

  if (!enabled) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="cursor-dot fixed pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: "50%",
          opacity: isVisible ? 1 : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Trail dots */}
      {trailDots.map((dot, index) => (
        <motion.div
          key={index}
          className="cursor-dot fixed pointer-events-none z-[9998]"
          style={{
            left: dot.x,
            top: dot.y,
            width: trailFadeOut ? size * (1 - index / trailLength) : size * 0.6,
            height: trailFadeOut ? size * (1 - index / trailLength) : size * 0.6,
            backgroundColor: trailColor,
            borderRadius: "50%",
            opacity: trailFadeOut ? (1 - index / trailLength) * 0.7 : 0.4,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </>
  );
};

// Special variant for interactive elements
export const useInteractiveCursor = () => {
  const [elements, setElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    // Find all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');

    const handleMouseEnter = (e: Event) => {
      const cursorDot = document.querySelector('.cursor-dot');
      if (cursorDot) cursorDot.classList.add('expand');
    };

    const handleMouseLeave = (e: Event) => {
      const cursorDot = document.querySelector('.cursor-dot');
      if (cursorDot) cursorDot.classList.remove('expand');
    };

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return null;
};
