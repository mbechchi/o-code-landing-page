import React, { useContext, useMemo } from "react";
import { IntersectionContext } from "../context/intersection0bserverContext";
import { motion } from "framer-motion";

export const ScaleUp = ({
    children,
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
      hidden: {
        scale: 0,
        opacity: 0,
        transition
      },
      show: {
        scale: 1,
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
