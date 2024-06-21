<template>
  <div class="clients-container">
    <h2>Клиенты</h2>
    <table class="clients-table">
      <thead>
        <tr>
          <th>Номер счета</th>
          <th>ФИО</th>
          <th>Дата рождения</th>
          <th>ИНН</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client._id">
          <!-- Данные клиента -->
          <td>{{ client.accountNumber }}</td>
          <td>{{ client.lastName }} {{ client.firstName }} {{ client.middleName }}</td>
          <td>{{ formatDate(client.birthDate) }}</td>
          <td>{{ client.inn }}</td>
          <!-- Выпадающий список для изменения статуса -->
          <td>
            <select v-model="client.status" @change="updateStatus(client)" class="status-select">
              <option>Не в работе</option>
              <option>В работе</option>
              <option>Отказ</option>
              <option>Сделка закрыта</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; 
import { useRouter } from 'vue-router'; // Импорт useRouter для навигации

const clients = ref([]); // переменная для хранения списка клиентов
const router = useRouter();

// Функция для получения списка клиентов с сервера
const fetchClients = async () => {
  try {
    const token = localStorage.getItem('token'); // Получение токена из localStorage
    const response = await fetch('http://localhost:3000/api/clients/user', {
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
    });
    const data = await response.json(); 
    clients.value = data; // Присвоение данных переменной clients для отображения в шаблоне
  } catch (error) {
    console.error('Ошибка при получении данных клиентов:', error); // Обработка ошибок при получении данных
  }
};

// Функция для обновления статуса клиента
const updateStatus = async (client) => {
  try {
    const token = localStorage.getItem('token'); 
    await fetch(`http://localhost:3000/api/clients/status/${client._id}`, {
      method: 'PUT', // Использование метода PUT для обновления данных
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ status: client.status }),
    });
  } catch (error) {
    console.error('Ошибка при изменении статуса:', error); 
  }
};

// Функция для форматирования даты в читаемый вид
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};


onMounted(() => {
  fetchClients(); // Вызов функции для получения списка клиентов при загрузке компонента
});
</script>

<style scoped>
.clients-container {
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.clients-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.clients-table th,
.clients-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.clients-table th {
  background-color: #D8013F;
  color: white;
}

.clients-table td select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.status-select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
