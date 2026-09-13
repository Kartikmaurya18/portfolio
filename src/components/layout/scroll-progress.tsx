"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 32, restDelta: 0.001 });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-accent/0 via-accent to-[#ffd9b8]"
    />
  );
}
