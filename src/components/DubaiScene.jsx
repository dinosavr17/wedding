import { useRef } from "react";
import {
    motion,
    useInView,
    useReducedMotion,
} from "motion/react";
import { DubaiWater } from "./DubaiWater";
import { DubaiYachts } from "./DubaiYachts";

export function DubaiScene() {
    const sceneRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const isVisible = useInView(sceneRef, {
        once: false,
        amount: 0.4,
    });

    return (
        <motion.section
            className="dubai-chapter"
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            aria-labelledby="dubai-title"
        >
            <div className="dubai-copy">
                <p className="eyebrow">
                    <time dateTime="2025-04">Апрель 2025</time>
                </p>

                <h2 id="dubai-title">Первое путешествие</h2>

                <p className="dubai-city">Дубай</p>

                <p className="dubai-description">
                    Солнце, море
                    <br />
                    и первые совместные приключения.
                </p>
            </div>

            <div ref={sceneRef} className="dubai-visual">
                <div className="dubai-artwork">
                    <img
                        className="dubai-image"
                        src="/images/dubai.png"
                        alt="Дина и Денис на яхте на фоне побережья Дубая"
                    />

                    {isVisible && !reduceMotion && (
                        <motion.div
                            className="dubai-camera-flash"
                            aria-hidden="true"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.75, 0] }}
                            transition={{
                                delay: 0.65,
                                duration: 0.35,
                                times: [0, 0.25, 1],
                            }}
                        />
                    )}
                </div>

                <motion.figure
                    className="dubai-polaroid"
                    initial={
                        reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: -45,
                                y: -25,
                                rotate: -12,
                                scale: 0.85,
                            }
                    }
                    animate={
                        isVisible || reduceMotion
                            ? {
                                opacity: 1,
                                x: 0,
                                y: 0,
                                rotate: 7,
                                scale: 1,
                            }
                            : {
                                opacity: 0,
                                x: -45,
                                y: -25,
                                rotate: -12,
                                scale: 0.85,
                            }
                    }
                    transition={{
                        delay: reduceMotion || !isVisible ? 0 : 0.95,
                        duration: reduceMotion ? 0 : isVisible ? 0.8 : 0.2,
                        ease: "easeOut",
                    }}
                >
                    <div className="dubai-polaroid-window">
                        <motion.img
                            className="dubai-polaroid-photo"
                            src="/images/dubai-photo.jpeg"
                            alt="Наше совместное селфи на яхте в Дубае"
                            initial={reduceMotion ? false : { opacity: 0 }}
                            animate={{
                                opacity: isVisible || reduceMotion ? 1 : 0,
                            }}
                            transition={{
                                delay: reduceMotion || !isVisible ? 0 : 1.55,
                                duration: reduceMotion ? 0 : isVisible ? 1.2 : 0.15,
                            }}
                        />
                    </div>

                    <figcaption className="dubai-polaroid-caption">
                        Дубай · апрель 2025
                    </figcaption>
                </motion.figure>
            </div>
        </motion.section>
    );
}
