require('dotenv').config(); 
const express = require("express");
const mongoose = require("mongoose");
const clientRoute = require("./routes/client.route.js");
const userRoute = require("./routes/user.route.js");
const PORT = process.env.PORT || 3000; // порт для сервера
const MONGO_URL = process.env.MONGO_URL; // получение URL для подключения к MongoDB из переменных окружения
const app = express();
const cors = require("cors"); 


// Middleware для работы с СORS, JSON и URL-encoded данными
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Маршруты
app.use("/api/clients", clientRoute); 
app.use("/api/users", userRoute); 

// Подключение к MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!"); 
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`); 
    });
  })
  .catch((error) => console.log("Ошибка подключения", error)); // Обработка ошибок 
