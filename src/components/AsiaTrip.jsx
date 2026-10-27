import { useEffect, useId, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useMotionValueEvent,
    useReducedMotion,
    useTransform,
} from "motion/react";

const STOPS = [
    {
        id: "shanghai",
        label: "Шанхай",
        x: 610,
        y: 440,
    },
    {
        id: "singapore",
        label: "Сингапур",
        x: 550,
        y: 1250,
    },
    {
        id: "hong-kong",
        label: "Гонконг",
        x: 560,
        y: 755,
    },
    {
        id: "okinawa",
        label: "Окинава",
        x: 780,
        y: 620,
    },
];

const ROUTES = [
    // Шанхай → Сингапур
    "M 610 440 C 780 650, 780 1060, 550 1250",

    // Сингапур → Гонконг
    "M 550 1250 C 390 1110, 660 920, 560 755",

    // Гонконг → Окинава
    "M 560 755 C 650 730, 685 655, 780 620",
];

// Контрольные точки совпадают с линиями ROUTES.
const CURVES = [
    [
        [610, 440],
        [780, 650],
        [780, 1060],
        [550, 1250],
    ],
    [
        [550, 1250],
        [390, 1110],
        [660, 920],
        [560, 755],
    ],
    [
        [560, 755],
        [650, 730],
        [685, 655],
        [780, 620],
    ],
];

const RUN_FRAMES = [1, 2, 3, 4].map(
    (frame) => `/images/runners/run-${frame}.png`,
);

const clamp = (value, min, max) =>
    Math.min(max, Math.max(min, value));

// Вычисляет положение пары на кривой маршрута.
function routePoint(progress) {
    const value = clamp(progress, 0, 3);
    const segment = Math.min(Math.floor(value), 2);
    const t = value - segment;
    const u = 1 - t;
    const points = CURVES[segment];

    return [0, 1].map(
        (axis) =>
            u ** 3 * points[0][axis] +
            3 * u ** 2 * t * points[1][axis] +
            3 * u * t ** 2 * points[2][axis] +
            t ** 3 * points[3][axis],
    );
}

// Прогресс зависит от фактического положения сцен.
function useTripProgress(sectionRef, stopRefs) {
    const progress = useMotionValue(0);
    const [activeStop, setActiveStop] = useState(0);

    useEffect(() => {
        let requestId = 0;
        let disposed = false;

        const update = () => {
            requestId = 0;

            if (disposed) return;

            const nodes = stopRefs.current.slice(0, STOPS.length);

            if (
                nodes.length !== STOPS.length ||
                nodes.some((node) => !node)
            ) {
                return;
            }

            const readingLine = window.innerHeight * 0.48;
            const anchors = nodes.map(
                (node) => node.getBoundingClientRect().top,
            );

            let value = 0;

            if (readingLine >= anchors[anchors.length - 1]) {
                value = STOPS.length - 1;
            } else if (readingLine > anchors[0]) {
                const next = anchors.findIndex(
                    (anchor) => anchor > readingLine,
                );

                const previous = next - 1;

                value =
                    previous +
                    clamp(
                        (readingLine - anchors[previous]) /
                        Math.max(
                            1,
                            anchors[next] - anchors[previous],
                        ),
                        0,
                        1,
                    );
            }

            progress.set(value);
            setActiveStop(Math.round(value));
        };

        const schedule = () => {
            if (!disposed && !requestId) {
                requestId = requestAnimationFrame(update);
            }
        };

        window.addEventListener("scroll", schedule, {
            passive: true,
        });
        window.addEventListener("resize", schedule);

        const observer =
            typeof ResizeObserver !== "undefined"
                ? new ResizeObserver(schedule)
                : null;

        if (sectionRef.current) {
            observer?.observe(sectionRef.current);
        }

        update();

        return () => {
            disposed = true;
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            observer?.disconnect();
            cancelAnimationFrame(requestId);
        };
    }, [progress, sectionRef, stopRefs]);

    return { progress, activeStop };
}

// Маска постепенно открывает цветной пунктир.
function RouteReveal({ path, index, progress }) {
    const length = useTransform(progress, (value) =>
        clamp(value - index, 0, 1),
    );

    const opacity = useTransform(length, (value) =>
        value > 0 ? 1 : 0,
    );

    return (
        <motion.path
            d={path}
            fill="none"
            stroke="white"
            strokeWidth="12"
            strokeLinecap="round"
            style={{
                pathLength: length,
                opacity,
            }}
        />
    );
}

function RunningCouple({ progress, activeStop }) {
    const reduceMotion = useReducedMotion();

    const [frame, setFrame] = useState(0);
    const [moving, setMoving] = useState(false);
    const [facing, setFacing] = useState(1);

    const stopTimer = useRef(null);
    const previous = useRef(progress.get());
    const previousX = useRef(routePoint(progress.get())[0]);

    const x = useTransform(
        progress,
        (value) => routePoint(value)[0],
    );

    const y = useTransform(
        progress,
        (value) => routePoint(value)[1],
    );

    // Загружаем все кадры заранее.
    useEffect(() => {
        RUN_FRAMES.forEach((src) => {
            const image = new Image();
            image.src = src;
        });

        return () => clearTimeout(stopTimer.current);
    }, []);

    useMotionValueEvent(progress, "change", (value) => {
        const pointX = routePoint(value)[0];
        const deltaX = pointX - previousX.current;
        const delta = Math.abs(value - previous.current);

        previous.current = value;
        previousX.current = pointX;

        if (reduceMotion || delta < 0.00001) return;

        if (Math.abs(deltaX) > 0.02) {
            setFacing(deltaX > 0 ? 1 : -1);
        }

        setMoving(true);
        clearTimeout(stopTimer.current);

        stopTimer.current = setTimeout(() => {
            setMoving(false);
        }, 180);
    });

    // Переключаем кадры только во время движения.
    useEffect(() => {
        if (!moving || reduceMotion) {
            setFrame(0);
            return;
        }

        const timer = setInterval(() => {
            setFrame((value) => (value + 1) % 4);
        }, 160);

        return () => clearInterval(timer);
    }, [moving, reduceMotion]);

    const staticStop = STOPS[activeStop];

    return (
        <motion.g
            aria-hidden="true"
            style={{
                x: reduceMotion ? staticStop.x : x,
                y: reduceMotion ? staticStop.y : y,
            }}
        >
            <g
                transform={`scale(${reduceMotion ? 1 : facing} 1)`}
            >
                <image
                    href={RUN_FRAMES[frame]}
                    x="-130"
                    y="-208"
                    width="260"
                    height="225.333"
                    preserveAspectRatio="xMidYMid meet"
                />
            </g>
        </motion.g>
    );
}

function TripMap({ activeStop, progress }) {
    const mapId = useId();

    return (
        <svg
            className="asia-map"
            viewBox="0 0 1122 1402"
            role="img"
            aria-label={
                "Маршрут: Шанхай, Сингапур, Гонконг, Окинава. " +
                `Сейчас: ${STOPS[activeStop].label}`
            }
        >
            <image
                href="/images/asia-map.png"
                width="1122"
                height="1402"
                preserveAspectRatio="xMidYMid meet"
            />

            <defs>
                {ROUTES.map((path, index) => (
                    <mask
                        key={path}
                        id={`${mapId}-route-${index}`}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="1122"
                        height="1402"
                    >
                        <RouteReveal
                            path={path}
                            index={index}
                            progress={progress}
                        />
                    </mask>
                ))}
            </defs>

            {ROUTES.map((path, index) => (
                <g key={path}>
                    <path
                        className="asia-map-route"
                        d={path}
                    />

                    <path
                        className="asia-map-route asia-map-route--active"
                        d={path}
                        mask={`url(#${mapId}-route-${index})`}
                    />
                </g>
            ))}

            {STOPS.map((stop, index) => (
                <g key={stop.id}>
                    <circle
                        cx={stop.x}
                        cy={stop.y}
                        r="19"
                        fill="#287f84"
                        opacity={index === activeStop ? 0.18 : 0}
                    />

                    <circle
                        cx={stop.x}
                        cy={stop.y}
                        r="7"
                        stroke="#fffdf8"
                        strokeWidth="3"
                        fill={
                            index <= activeStop
                                ? "#287f84"
                                : "#aaa99d"
                        }
                    />
                </g>
            ))}

            <RunningCouple
                progress={progress}
                activeStop={activeStop}
            />
        </svg>
    );
}

function TripStop({ index, stopRefs, children }) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.article
            ref={(node) => {
                stopRefs.current[index] = node;
            }}
            className="asia-stop"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: reduceMotion ? 0 : 0.7,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.article>
    );
}

export function AsiaTrip() {
    const sectionRef = useRef(null);
    const stopRefs = useRef([]);

    const { progress, activeStop } = useTripProgress(
        sectionRef,
        stopRefs,
    );

    return (
        <section
            ref={sectionRef}
            className="asia-trip"
            aria-labelledby="asia-trip-title"
        >
            <header className="asia-trip-heading">
                <p className="eyebrow">
                    <time dateTime="2025-10">Октябрь 2025</time>
                </p>

                <h2 id="asia-trip-title">
                    Одно путешествие — несколько миров
                </h2>

                <p>
                    Большие города, короткие пересадки
                    и ещё больше общих воспоминаний.
                </p>
            </header>

            <div className="asia-trip-layout">
                <aside className="asia-map-column">
                    <div className="asia-map-sticky">
                        <p className="eyebrow">Наш маршрут</p>

                        <TripMap
                            activeStop={activeStop}
                            progress={progress}
                        />

                        <p className="asia-map-caption">
                            {STOPS[activeStop].label}
                        </p>
                    </div>
                </aside>

                <div className="asia-trip-scenes">
                    <TripStop index={0} stopRefs={stopRefs}>
                        <p className="eyebrow">01 · Китай</p>
                        <h3>Шанхай</h3>

                        <p className="asia-stop-description">
                            Пересадка, которая стала прогулкой.
                            Yu Garden, Нанкинская улица и набережная —
                            между двумя рейсами.
                        </p>

                        <img
                            className="asia-scene-image"
                            src="/images/shanghai.png"
                            alt="Дина и Денис гуляют по Шанхаю с дорожными сумками"
                            loading="lazy"
                        />
                    </TripStop>

                    <TripStop index={1} stopRefs={stopRefs}>
                        <p className="eyebrow">02 · Сингапур</p>
                        <h3>Город из будущего</h3>

                        <p className="asia-stop-description">
                            Вечер под супердеревьями
                            и водопад посреди аэропорта.
                        </p>

                        <img
                            className="asia-scene-image"
                            src="/images/singapore-supertrees.png"
                            alt="Прогулка Дины и Дениса под супердеревьями Сингапура"
                            loading="lazy"
                        />

                        <figure className="asia-jewel">
                            <img
                                className="asia-scene-image"
                                src="/images/singapore-jewel.png"
                                alt="Дина и Денис у водопада в Jewel"
                                loading="lazy"
                            />

                            <figcaption>
                                Даже аэропорт — отдельное приключение.
                            </figcaption>
                        </figure>
                    </TripStop>

                    <TripStop index={2} stopRefs={stopRefs}>
                        <p className="eyebrow">
                            03 · Гонконг · пересадка 2 часа
                        </p>

                        <h3>Успеть на следующий рейс</h3>

                        <p className="asia-stop-description">
                            За окнами начинался рассвет.
                            А у нас — забег к выходу на посадку.
                        </p>

                        <img
                            className="asia-scene-image"
                            src="/images/hong-kong.png"
                            alt="Дина и Денис бегут по аэропорту Гонконга на рассвете"
                            loading="lazy"
                        />
                    </TripStop>

                    <TripStop index={3} stopRefs={stopRefs}>
                        <p className="eyebrow">04 · Япония</p>
                        <h3>Окинава</h3>

                        <p className="asia-stop-description">
                            После городов и пересадок —
                            время замедлиться.
                        </p>
                    </TripStop>
                </div>
            </div>
        </section>
    );
}