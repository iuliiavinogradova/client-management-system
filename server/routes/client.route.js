const express = require("express");
const router = express.Router();
const { getUserClients, getClients, getClient, createClient, updateClientStatus } = require("../controllers/client.controller.js");
const { authenticate } = require("../middleware/authenticate.js");

// Маршрут для получения клиентов авторизованного пользователя 
router.get('/user', authenticate, getUserClients);

// Маршрут для получения всех пользователей
router.get('/', getClients);

// Маршрут для получения данных одного клиента по id
router.get('/:id', getClient);

// Маршрут для создания нового клиента
router.post('/', authenticate, createClient);

// Маршрут для обновления статуса клиента по его идентификатору 
router.put('/status/:id', authenticate, updateClientStatus);

module.exports = router;
