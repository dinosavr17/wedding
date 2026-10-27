import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const FRAMES = [1, 2, 3, 4];

export function RunningCouple({ className = "", alt = "Дина и Денис бегут вместе" }) {
    const containerRef = useRef(null);
    const isVisible = useInView(containerRef);
    const reduceMotion = useReducedMotion();
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        if (reduceMotion || !isVisible) return;

        const timer = window.setInterval(() => {
            setFrame((current) => (current + 1) % FRAMES.length);
        }, 140);

        return () => window.clearInterval(timer);
    }, [isVisible, reduceMotion]);

    return (
        <div ref={containerRef} className={`running-couple ${className}`.trim()}>
            {FRAMES.map((number, index) => (
                <img
                    key={number}
                    className="running-couple-frame"
                    src={`/images/runners/run-${number}.png`}
                    width="600"
                    height="520"
                    alt={index === 0 ? alt : ""}
                    aria-hidden={index === 0 ? undefined : true}
                    style={{ opacity: index === (reduceMotion ? 0 : frame) ? 1 : 0 }}
                    draggable={false}
                />
            ))}
        </div>
    );
}
