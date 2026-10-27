import { useRef } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "motion/react";

// Координаты маршрута внутри SVG.
const ROUTE_PATH = `
  M 60 140
  C 160 140, 160 50, 280 50
  S 440 230, 560 230
  S 720 80, 940 80
`;

export function AnimatedRoute() {
    const containerRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 90%", "end 40%"],
    });

    const routeProgress = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "100%"],
    );

    return (
        <section
            ref={containerRef}
            className="animated-route"
            aria-label="Продолжение нашей истории"
        >
            <p className="eyebrow animated-route-label">
                Наш маршрут только начинается
            </p>

            <div className="route-canvas" aria-hidden="true">
                <svg
                    className="route-svg"
                    viewBox="0 0 1000 300"
                    fill="none"
                >
                    {/* Полный маршрут — виден сразу. */}
                    <path
                        d={ROUTE_PATH}
                        className="route-track"
                    />

                    {/* Бирюзовая линия появляется при прокрутке. */}
                    <motion.path
                        d={ROUTE_PATH}
                        className="route-progress"
                        style={{
                            pathLength: reduceMotion ? 1 : scrollYProgress,
                        }}
                    />

                    <circle cx="60" cy="140" r="6" className="route-point" />
                    <circle cx="940" cy="80" r="6" className="route-point" />
                </svg>

                <motion.div
                    className="route-plane"
                    style={{
                        offsetDistance: reduceMotion ? "100%" : routeProgress,
                    }}
                >
                    <span className="route-plane-emoji">✈️</span>
                </motion.div>
            </div>

            <p className="route-caption">
                Впереди — наши города и приключения
            </p>
        </section>
    );
}
