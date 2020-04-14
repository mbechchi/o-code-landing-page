import React, { useContext, useMemo } from "react";
import { IntersectionContext } from "../context/intersection0bserverContext";
import { motion } from "framer-motion";

// Fade in with Framer Motion and IntersectionObserver
// -----------------------------
export const FadeInUp = ({
    children,
    yOffset = 24, // y initial position
    duration = 0.4,
    easing = [0.42, 0, 0.58, 1],
    delay = 0, // order of appearance
    ...rest
  }) => {
    const { inView } = useContext(IntersectionContext);

    const transition = useMemo(
      () => ({
        duration,
        delay: delay / 1000, // ms
        ease: easing
      }),
      [duration, delay, easing]
    );

    const variants = {
      hidden: { y: yOffset, opacity: 0, transition },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition
      }
    };

    return (
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        exit="hidden"
        variants={variants}
        {...rest}
      >
        {children} {inView}
      </motion.div>
    );
  };
