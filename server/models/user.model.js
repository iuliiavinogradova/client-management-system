const mongoose = require("mongoose");

// Cхема для коллекции Пользователь
const UserSchema = new mongoose.Schema({
  // Имя - обязательно
  fullName: {
    type: String,
    required: true
  },
  // Уникальное имя пользователя
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Добавляет поля createdAt и updatedAt

// Создание модели 
const User = mongoose.model("User", UserSchema);

// Экспорт модели 
module.exports = User;
