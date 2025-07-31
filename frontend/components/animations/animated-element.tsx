"use client";

import React from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";

export interface AnimatedElementProps {
  children: React.ReactNode;
  animation?:
    | "fadeIn"
    | "slideUp"
    | "slideLeft"
    | "slideRight"
    | "zoom"
    | "bounce"
    | "rotate"
    | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  viewport?: { once?: boolean; amount?: number };
  custom?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

// Animation variants
const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  slideLeft: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  slideRight: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  zoom: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  bounce: {
    hidden: { scale: 0.6, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    },
  },
  rotate: {
    hidden: { rotate: -10, opacity: 0 },
    visible: { rotate: 0, opacity: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 0.5,
  className = "",
  viewport = { once: true, amount: 0.3 },
  custom,
  transition,
}) => {
  const selectedAnimation = animations[animation];

  // Create a React Fragment to avoid DOM nesting issues
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={selectedAnimation}
      transition={
        animation === "bounce"
          ? ({
              type: "spring",
              stiffness: 400,
              damping: 10,
              delay,
              ...transition,
            } as Transition)
          : transition || {
              duration,
              delay,
              ease: "easeOut",
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

// For components that need to animate when they mount/unmount
export const AnimatedWrapper: React.FC<
  AnimatedElementProps & { isVisible: boolean; id?: string }
> = ({
  children,
  isVisible,
  id,
  animation = "fadeIn",
  delay = 0,
  duration = 0.5,
  transition,
  ...props
}) => {
  const selectedAnimation = animations[animation];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={id}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={selectedAnimation}
          transition={
            animation === "bounce"
              ? ({
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  delay,
                  ...transition,
                } as Transition)
              : transition || {
                  duration,
                  delay,
                  ease: "easeOut",
                }
          }
          {...props}
        >
          {React.Children.only(children)}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
