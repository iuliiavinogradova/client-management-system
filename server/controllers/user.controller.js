const User = require("../models/user.model.js");
const Client = require("../models/client.model.js"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config.js");

// Функция для авторизации пользователя
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body; 
    const user = await User.findOne({ username }); // Поиск пользователя в базе данных по имени пользователя

    // Проверка
    if (!user) {
      return res.status(400).json({ message: "Неверные учетные данные" });
    }

    // Проверка правильности пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Если пароль неверен, возвращаем ошибку
    if (!isPasswordValid) {
      console.log("Сравнение паролей не удалось:", password, user.password);
      return res.status(400).json({ message: "Неверные учетные данные" });
    }

    // Генерация JWT токена для авторизованного пользователя
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ token }); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Функция для получения клиентов пользователя
const getUserClients = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const user = await User.findById(userId); // Поиск пользователя в базе данных по id
    const clients = await Client.find({ responsiblePerson: user.fullName }); // Поиск клиентов, за которых отвечает данный пользователь

    res.status(200).json(clients); // Возвращаем список клиентов в ответе
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных клиентов: " + error.message }); 
  }
};

// Функция для получения списка всех пользователей
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users); 
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных пользователей: " + error.message }); 
  }
};

// Функция для регистрации нового пользователя
const registerUser = async (req, res) => {
  try {
    const { fullName, username, password } = req.body; 

    // Проверка
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Имя пользователя уже существует" });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10); // 10 - количество раундов соли

    // Создание нового пользователя с хешированным паролем
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword, 
    });

    // Сохранение нового пользователя в базе данных
    await newUser.save();

    res.status(201).json({ message: "Регистрация прошла успешно" }); // сообщение об успешной регистрации
  } catch (error) {
    res.status(500).json({ message: "Ошибка при регистрации: " + error.message }); 
  }
};

module.exports = {
  loginUser,
  getUserClients,
  getUsers,
  registerUser
};
