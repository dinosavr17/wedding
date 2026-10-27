import express from "express";

const app = express();
const PORT = 3001;

// Позволяет серверу читать JSON из будущих запросов формы.
app.use(express.json());

// Когда браузер обращается к этому адресу, возвращаем ответ.
app.get("/api/health", (req, res) => {
    res.json({
        message: "Сервер работает",
    });
});

// Запускаем сервер.
app.listen(PORT, () => {
    console.log(`Бэкенд запущен: http://localhost:${PORT}`);
});