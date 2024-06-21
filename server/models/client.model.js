const mongoose = require("mongoose");

// Определение схемы для коллекции Клиент
const ClientSchema = new mongoose.Schema({
  // Номер счета
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  inn: {
    type: String,
    required: true,
    unique: true
  },
  // ФИО ответственного
  responsiblePerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Статус (по умолчанию «Не в работе»)
  status: {
    type: String,
    required: true,
    default: "Не в работе"
  }
}, { timestamps: true }); 

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
