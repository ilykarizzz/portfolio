"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  type?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'rotate';
}

export function ScrollAnimation({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  className = "",
  type = 'fade'
}: ScrollAnimationProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  const getVariants = () => {
    switch (type) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
      case 'slide-down':
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 }
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 }
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 }
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -10 },
          visible: { opacity: 1, rotate: 0 }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={getVariants()}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
