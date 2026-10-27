import { motion, useReducedMotion } from "motion/react";

export function DubaiYachts() {
    const reduceMotion = useReducedMotion();

    return (
        <motion.img
            className="dubai-yachts"
            src="/images/yachts.png"
            alt=""
            aria-hidden="true"
            initial={false}
            animate={
                reduceMotion
                    ? { y: 0 }
                    : { y: [0, -2, 0, 1, 0] }
            }
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            draggable={false}
        />
    );
}