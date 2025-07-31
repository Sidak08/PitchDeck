"use client";

import React, { useEffect, useState } from "react";
import { CursorTrail, useInteractiveCursor } from "@/components/animations/cursor-trail";

interface CursorProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export const CursorProvider: React.FC<CursorProviderProps> = ({
  children,
  enabled = true,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      return (
        typeof window !== "undefined" &&
        (window.matchMedia("(max-width: 768px)").matches ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ))
      );
    };

    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Enable interactive cursor effects
  useInteractiveCursor();

  return (
    <>
      {children}
      {isMounted && enabled && !isMobile && (
        <CursorTrail
          color="rgba(44, 161, 95, 0.8)"
          trailColor="rgba(44, 161, 95, 0.5)"
          size={8}
          trailLength={8}
          smoothFactor={0.3}
        />
      )}
    </>
  );
};
