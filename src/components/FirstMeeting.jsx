import { motion, useReducedMotion } from "motion/react";
import { ThoughtBubble } from "./ThoughtBubble";

export function FirstMeeting() {
    const reduceMotion = useReducedMotion();

    return (
        <motion.article
            className="meeting-chapter"
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            aria-labelledby="meeting-title"
        >
            <div className="meeting-copy">
                <p className="eyebrow">
                    <time dateTime="2023-07">Июль 2023</time>
                </p>

                <h2 id="meeting-title">Первая встреча</h2>

                <p className="meeting-description">
                    Один офис, два программиста
                    <br />
                    и много обсуждений кода.
                </p>
            </div>

            <div className="meeting-scene">
                <img
                    className="meeting-image"
                    src="/images/first-meeting.png"
                    alt="Дина и Денис за рабочим столом с двумя iMac"
                />

                <div
                    className="meeting-bubble-position meeting-bubble-position--code"
                    aria-hidden="true"
                >
                    <ThoughtBubble type="code" />
                </div>

                <div
                    className="meeting-bubble-position meeting-bubble-position--heart"
                    aria-hidden="true"
                >
                    <ThoughtBubble type="heart" />
                </div>
            </div>
        </motion.article>
    );
}