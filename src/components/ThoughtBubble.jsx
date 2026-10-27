import { motion, useReducedMotion } from "motion/react";

export function ThoughtBubble({ type }) {
    const reduceMotion = useReducedMotion();
    const isHeart = type === "heart";

    return (
        <motion.svg
            className="thought-bubble-svg"
            viewBox="0 0 80 64"
            fill="none"
            aria-hidden="true"
            animate={reduceMotion ? { y: 0 } : { y: [0, -5, 0] }}
            transition={{
                duration: 3.5,
                delay: isHeart ? 0.7 : 0,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {/* Общая рамка одинакового размера для обоих облачков. */}
            <path
                d="
          M 10 2
          H 70
          L 78 10
          V 44
          L 70 52
          H 38
          L 24 62
          V 52
          H 10
          L 2 44
          V 10
          Z
        "
                fill="var(--color-paper, #f8f5ed)"
                stroke="#202a2c"
                strokeWidth="2"
            />

            {isHeart ? (
                /* Маленькое красное сердце из квадратных пикселей. */
                <g
                    transform="translate(28 18) scale(3)"
                    fill="#d94b55"
                    shapeRendering="crispEdges"
                >
                    <path
                        d="
              M 1 0 H 3 V 1 H 5 V 0 H 7
              V 1 H 8 V 3 H 7 V 4 H 6
              V 5 H 5 V 6 H 3 V 5 H 2
              V 4 H 1 V 3 H 0 V 1 H 1 Z
            "
                    />
                </g>
            ) : (
                /* Пиксельный символ </>. */
                <g
                    fill="#202a2c"
                    transform="translate(8 5.2) scale(0.8)"
                >
                    {/* Левая скобка. */}
                    <path
                        d="
              M 24 16 H 28 V 20 H 24 Z
              M 20 20 H 24 V 24 H 20 Z
              M 16 24 H 20 V 28 H 16 Z
              M 20 28 H 24 V 32 H 20 Z
              M 24 32 H 28 V 36 H 24 Z
            "
                    />

                    {/* Косая черта. */}
                    <path
                        d="
              M 42 14 H 46 V 20 H 42 Z
              M 38 20 H 42 V 26 H 38 Z
              M 34 26 H 38 V 32 H 34 Z
              M 30 32 H 34 V 38 H 30 Z
            "
                    />

                    {/* Правая скобка. */}
                    <path
                        d="
              M 52 16 H 56 V 20 H 52 Z
              M 56 20 H 60 V 24 H 56 Z
              M 60 24 H 64 V 28 H 60 Z
              M 56 28 H 60 V 32 H 56 Z
              M 52 32 H 56 V 36 H 52 Z
            "
                    />
                </g>
            )}
        </motion.svg>
    );
}