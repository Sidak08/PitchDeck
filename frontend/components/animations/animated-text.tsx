"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?:
    | "fadeIn"
    | "typewriter"
    | "wordByWord"
    | "letterByLetter"
    | "slideUp"
    | "highlight";
  highlightColor?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  onAnimationComplete?: () => void;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  once = true,
  repeatDelay = 0,
  animation = "fadeIn",
  highlightColor = "rgba(44, 161, 95, 0.3)",
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.03,
  onAnimationComplete,
}) => {
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);
  const [renderedText, setRenderedText] = useState("");
  const [count, setCount] = useState(0);

  // Animations
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const wordByWord = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const letterByLetter = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const highlight = {
    hidden: { backgroundSize: "0% 100%" },
    visible: { backgroundSize: "100% 100%" },
  };

  useEffect(() => {
    // Type writer effect
    if (animation === "typewriter") {
      if (count < text.length) {
        const timeout = setTimeout(() => {
          setRenderedText((prev) => prev + text.charAt(count));
          setCount((prev) => prev + 1);
        }, 35);
        return () => clearTimeout(timeout);
      } else if (!once && repeatDelay > 0) {
        const timeout = setTimeout(() => {
          setRenderedText("");
          setCount(0);
        }, repeatDelay);
        return () => clearTimeout(timeout);
      }
    }
  }, [animation, count, once, repeatDelay, text]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible").then(() => {
        if (onAnimationComplete) onAnimationComplete();
        if (!once && repeatDelay > 0) {
          setTimeout(() => {
            controls.start("hidden").then(() => {
              controls.start("visible");
            });
          }, repeatDelay);
        }
      });
    }
  }, [controls, isInView, once, repeatDelay, onAnimationComplete]);

  // Render different animations
  if (animation === "typewriter") {
    return (
      <div className={className}>
        {renderedText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-[2px] h-[1em] ml-1 bg-current align-middle"
        />
      </div>
    );
  }

  if (animation === "wordByWord") {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        onViewportEnter={() => setIsInView(true)}
        viewport={{ once }}
      >
        {text.split(" ").map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={wordByWord}
            transition={{
              delay: delay + i * staggerChildren,
              duration,
              ease: "easeOut",
            }}
          >
            {word + "\u00A0"}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (animation === "letterByLetter") {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        onViewportEnter={() => setIsInView(true)}
        viewport={{ once }}
      >
        {text.split("").map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={letterByLetter}
            transition={{
              delay: delay + i * staggerChildren,
              duration,
              ease: "easeOut",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (animation === "slideUp") {
    return (
      <div className={`${className} overflow-hidden`}>
        <motion.div
          initial="hidden"
          animate="visible"
          onViewportEnter={() => setIsInView(true)}
          viewport={{ once }}
          variants={slideUp}
          transition={{
            delay,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {text}
        </motion.div>
      </div>
    );
  }

  if (animation === "highlight") {
    return (
      <motion.span
        className={className}
        initial="hidden"
        animate="visible"
        onViewportEnter={() => setIsInView(true)}
        viewport={{ once }}
        variants={highlight}
        transition={{
          delay,
          duration: 0.8,
          ease: "easeOut",
        }}
        style={{
          backgroundImage: `linear-gradient(to right, ${highlightColor}, ${highlightColor})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 90%",
          paddingBottom: "2px",
        }}
      >
        {text}
      </motion.span>
    );
  }

  // Default fadeIn animation
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate={controls}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once }}
      variants={fadeIn}
      transition={{
        delay,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {text}
    </motion.span>
  );
};
