const Client = require("../models/client.model.js");

// Функция для получения клиентов авторизованного пользователя
const getUserClients = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const clients = await Client.find({ responsiblePerson: userId }); // Поиск клиентов по id
    res.status(200).json(clients); // Возвращаем список клиентов 
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных клиентов: " + error.message }); // Обработка ошибок сервера
  }
};

// Функция для получения списка всех клиентов
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({}); // Получение всех клиентов из базы данных
    res.status(200).json(clients); 
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных клиентов: " + error.message }); 
  }
};

// Функция для получения данных одного клиента по id
const getClient = async (req, res) => {
  try {
    const { id } = req.params; // Получение id
    const client = await Client.findById(id); // Поиск клиента по id
    res.status(200).json(client); 
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных клиента: " + error.message }); 
  }
};

// Функция для создания нового клиента
const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body); 
    res.status(200).json(client); 
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании клиента: " + error.message }); 
  }
};

// Функция для обновления статуса клиента
const updateClientStatus = async (req, res) => {
  try {
    const { id } = req.params; // Получение id
    const { status } = req.body; // Получение нового статуса
    const client = await Client.findByIdAndUpdate(id, { status }, { new: true }); // Обновление статуса клиента

    if (!client) {
      return res.status(400).json({ message: "Клиент не найден" }); 
    }

    res.status(200).json(client); 
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении статуса клиента: " + error.message }); 
  }
};

module.exports = {
  getUserClients,
  getClients,
  getClient,
  createClient,
  updateClientStatus
};
