const express = require("express");
const router = express.Router();
const { loginUser, getUserClients, getUsers, registerUser } = require("../controllers/user.controller.js");
const { authenticate } = require("../middleware/authenticate.js");

// Маршрут для авторизации
router.post('/login', loginUser);

// Маршрут для получения клиентов авторизованного пользователя 
router.get('/clients', authenticate, getUserClients);

// Маршрут для получения всех пользователей
router.get('/', getUsers);

// Маршрут для регистрации нового пользователя
router.post('/register', registerUser);

module.exports = router;
