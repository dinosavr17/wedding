import { useRef } from "react";
import {
    motion,
    useInView,
    useReducedMotion,
} from "motion/react";

const WAVES = [
    { x: 790, y: 405, scale: 0.85, delay: 0 },
    { x: 895, y: 440, scale: 1.1, delay: 1.2 },
    { x: 920, y: 505, scale: 0.9, delay: 2.4 },
];

function Wave() {
    return (
        <>
            {/* Бирюзовое тело волны с приподнятым гребнем */}
            <path
                d="
                    M 0 23
                    C 15 23, 24 19, 32 9
                    C 40 -2, 55 -3, 65 5
                    C 54 3, 48 10, 52 16
                    C 58 23, 77 24, 95 23
                    C 72 34, 24 34, 0 23 Z
                "
                fill="#28bbd0"
                stroke="#117f9f"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />

            {/* Светлая внутренняя сторона */}
            <path
                d="
                    M 12 23
                    C 30 20, 35 7, 48 5
                    C 41 13, 42 22, 56 26
                    C 38 29, 23 27, 12 23 Z
                "
                fill="#83e5ec"
            />

            {/* Белая пена на завитке */}
            <path
                d="
                    M 24 17
                    C 34 4, 44 -3, 56 0
                    C 62 1, 66 4, 68 8
                    C 61 4, 54 5, 50 9
                    C 47 12, 48 16, 53 19
                    C 46 18, 43 14, 44 10
                    C 37 11, 32 16, 28 20 Z
                "
                fill="#f4ffff"
            />

            {/* Пенный след у основания */}
            <path
                d="M 9 26 Q 30 31 48 28 T 88 27"
                fill="none"
                stroke="#eaffff"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </>
    );
}

export function DubaiWater() {
    const waterRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const isVisible = useInView(waterRef, {
        amount: 0.1,
    });

    return (
        <svg
            ref={waterRef}
            className="dubai-water"
            viewBox="0 0 1000 660"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
        >
            {WAVES.map((wave, index) => (
                <g
                    key={index}
                    transform={`translate(${wave.x} ${wave.y}) scale(${wave.scale})`}
                >
                    <motion.g
                        initial={false}
                        animate={
                            reduceMotion || !isVisible
                                ? { x: 0, y: 0, opacity: 0.85 }
                                : {
                                    x: [0, 6, 12],
                                    y: [0, -3, 0],
                                    opacity: [0.55, 1, 0.55],
                                }
                        }
                        transition={
                            reduceMotion || !isVisible
                                ? { duration: 0 }
                                : {
                                    duration: 4,
                                    delay: wave.delay,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                }
                        }
                    >
                        <Wave />
                    </motion.g>
                </g>
            ))}
        </svg>
    );
}