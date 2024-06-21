const jwt = require("jsonwebtoken");
const { secret } = require("../config.js");

// Функция для аутентификации пользователя 
const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Проверка наличия заголовка в правильном формате
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  const token = authHeader.replace("Bearer ", ""); // Извлечение токена

  try {
    const decoded = jwt.verify(token, secret); // Верификация токена с использованием секретного ключа
    req.user = decoded; // Сохранение декодированной информации о пользователе в запросе
    next(); // Переход к следующему middleware или обработчику маршрута
  } catch (error) {
    res.status(401).json({ message: "Неверный токен" });
  }
};

module.exports = { authenticate };
