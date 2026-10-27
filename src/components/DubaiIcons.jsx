import { motion, useReducedMotion } from "motion/react";

export function DubaiIcons({ isVisible }) {
    const reduceMotion = useReducedMotion();
    const show = isVisible || reduceMotion;

    const appearance = (delay, rotate = 0) => ({
        initial: false,
        animate: {
            opacity: show ? 1 : 0,
            y: show ? 0 : 8,
            scale: show ? 1 : 0.85,
            rotate: show ? rotate : rotate - 8,
        },
        transition: {
            duration: reduceMotion ? 0 : 0.45,
            delay: show && !reduceMotion ? delay : 0,
            ease: "easeOut",
        },
    });

    return (
        <div className="dubai-icons" aria-hidden="true">
            <motion.div
                className="dubai-icon dubai-icon--sun"
                {...appearance(0.15)}
            >
                <svg viewBox="0 0 48 48" fill="none">
                    {/* Тонкие лучи вместо крупных квадратов. */}
                    <g
                        stroke="#c99636"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <path d="M24 4v5 M24 39v5" />
                        <path d="M4 24h5 M39 24h5" />
                        <path d="m10 10 3.5 3.5 M34.5 34.5 38 38" />
                        <path d="m10 38 3.5-3.5 M34.5 13.5 38 10" />
                    </g>

                    <circle
                        cx="24"
                        cy="24"
                        r="10.5"
                        fill="#f5cf70"
                        stroke="#a67b32"
                        strokeWidth="1.5"
                    />

                    <path
                        d="M18 20a7 7 0 0 1 8-3"
                        stroke="#fff1bd"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </motion.div>

            <motion.div
                className="dubai-icon dubai-icon--glasses"
                {...appearance(0.4, -8)}
            >
                <svg viewBox="0 0 64 44" fill="none">
                    {/* Слегка приподнятые внешние уголки оправы. */}
                    <path
                        d="
              M5 16
              Q15 13 27 17
              L25 28
              Q24 32 16 32
              Q8 32 7 27
              Z
            "
                        fill="#fffdf8"
                        stroke="#29383d"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                    />

                    <path
                        d="
              M37 17
              Q49 13 59 16
              L57 27
              Q56 32 48 32
              Q40 32 39 28
              Z
            "
                        fill="#fffdf8"
                        stroke="#29383d"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                    />

                    {/* Перемычка и дужки. */}
                    <path
                        d="M27 20Q32 17 37 20 M5 17 2 16 M59 17l3-1"
                        stroke="#29383d"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />

                    {/* Линзы. */}
                    <path
                        d="
              M10 19Q17 17 23 20
              L21.5 27Q17 30 12 27Z
            "
                        fill="#2d4650"
                    />

                    <path
                        d="
              M41 20Q48 17 54 19
              L52 27Q47 30 43 27Z
            "
                        fill="#2d4650"
                    />

                    <path
                        d="m13 21 5-1 M44 21l5-1"
                        stroke="#9bbdc3"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                    />

                    {/* Небольшая четырёхлучевая искра. */}
                    <motion.path
                        d="
              M51 3
              Q51 10 57 10
              Q51 10 51 17
              Q51 10 45 10
              Q51 10 51 3Z
            "
                        fill="#f4cf78"
                        stroke="#af853d"
                        strokeWidth="0.8"
                        initial={false}
                        animate={{
                            opacity: show ? 1 : 0,
                            scale: show ? 1 : 0.5,
                        }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.35,
                            delay: show && !reduceMotion ? 0.8 : 0,
                        }}
                        style={{
                            transformBox: "fill-box",
                            transformOrigin: "center",
                        }}
                    />
                </svg>
            </motion.div>
        </div>
    );
}