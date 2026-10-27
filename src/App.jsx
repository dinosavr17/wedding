import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";

function ComingSoonPage({ title }) {
    return (
        <main className="placeholder-page">
            <p className="eyebrow">Дина и Денис</p>
            <h1>{title}</h1>
            <p>Скоро здесь появятся подробности.</p>
        </main>
    );
}

export default function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route
                    path="/details"
                    element={<ComingSoonPage title="Детали" />}
                />

                <Route
                    path="/location"
                    element={<ComingSoonPage title="Локация" />}
                />

                <Route
                    path="/faq"
                    element={<ComingSoonPage title="Вопросы и ответы" />}
                />

                <Route
                    path="/rsvp"
                    element={<ComingSoonPage title="Анкета гостя" />}
                />

                <Route
                    path="*"
                    element={<ComingSoonPage title="Страница не найдена" />}
                />
            </Routes>
        </>
    );
}