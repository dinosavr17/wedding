import { motion, useReducedMotion } from "motion/react";
import { AnimatedRoute } from "../components/AnimatedRoute"
import { FirstMeeting } from "../components/FirstMeeting";
import { DubaiScene } from "../components/DubaiScene";
import { AsiaTrip } from "../components/AsiaTrip";

export function HomePage() {
    const reduceMotion = useReducedMotion();

    return (
        <main className="home-page">
            <section className="story-intro" aria-labelledby="story-title">
                <motion.div
                    className="story-heading"
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="eyebrow">Дина и Денис</p>

                    <h1 id="story-title">
                        Наша
                        <br />
                        история
                    </h1>

                    <p className="story-tagline">
                        Разные города.
                        <br />
                        Один маршрут.
                    </p>

                    <span className="story-heart" aria-hidden="true">
            ♡
          </span>
                </motion.div>
                <FirstMeeting />
            </section>

            <AnimatedRoute />
            <DubaiScene />
            <AsiaTrip />
        </main>
    );
}